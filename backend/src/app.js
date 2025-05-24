require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const topicRoutes = require("./routes/topicRoutes");
const essayRoutes = require("./routes/essayRoutes");
const cors = require("cors");
const path = require("path");
require("./config/passport");

const app = express();
app.use(express.json());
connectDB();

// Updated CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Make sure static directory for uploads exists
const uploadDir = path.join(__dirname, "../public/uploads/avatars");
const fs = require("fs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/", topicRoutes);
app.use("/", essayRoutes);

// Add a route to check if avatar images are accessible
app.get("/check-avatar", (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  try {
    // Try to extract the filename from the URL
    const parts = url.split("/");
    const filename = parts[parts.length - 1].split("?")[0]; // Remove any query params

    const filePath = path.join(
      __dirname,
      "../public/uploads/avatars",
      filename
    );

    if (fs.existsSync(filePath)) {
      return res.status(200).send({ exists: true, path: filePath });
    } else {
      return res.status(404).send({ exists: false, path: filePath });
    }
  } catch (err) {
    console.error("Error checking avatar:", err);
    return res.status(500).send("Error checking avatar file");
  }
});

app.listen(8080, () =>
  console.log("Server listening on http://localhost:8080")
);
