const express = require("express");
const passport = require("passport");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  register,
  confirmRegister,
  forgotPassword,
  resetPassword,
  login,
  googleLoginCallback,
  refreshToken,
  logout,
} = require("../controllers/authController");
const {
  updateProfile,
  changePassword,
  getProfile,
  updateAvatar,
  removeAvatar,
} = require("../controllers/profileController");
const { authenticateToken } = require("../middleware/auth");

// Make sure the uploads directory exists
const uploadDir = path.join(__dirname, "../../public/uploads/avatars");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads/avatars"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "avatar-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: fileFilter,
});

// Existing routes
router.post("/register", register);
router.post("/confirm-register", confirmRegister);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login", login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  googleLoginCallback
);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.patch("/update-profile", authenticateToken, updateProfile);
router.put("/change-password", authenticateToken, changePassword);
router.get("/getProfile", authenticateToken, getProfile);
router.post(
  "/update-avatar",
  authenticateToken,
  upload.single("avatar"),
  updateAvatar
);
router.delete("/remove-avatar", authenticateToken, removeAvatar);

module.exports = router;
