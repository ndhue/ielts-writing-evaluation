const express = require("express");
const router = express.Router();
const {
  submitEssay,
  getEssayHistory,
  getFeedbackHistory,
  getResultEssaydetail,
  getAllResultEssay,
  getFeedbackHistoryDetail,
} = require("../controllers/essayController");
const {
  authenticateToken,
  authenticateOptional,
} = require("../middleware/auth");
router.post("/essay", authenticateOptional, submitEssay);
router.get("/getEssayHistory", authenticateToken, getEssayHistory);
router.get("/getFeedbackHistory", authenticateToken, getFeedbackHistory);
router.get("/getEssayDetail", authenticateToken, getResultEssaydetail);
router.get("/getAllResultEssay", authenticateToken, getAllResultEssay);
router.get(
  "/getFeedbackHistoryDetail",
  authenticateToken,
  getFeedbackHistoryDetail
);
module.exports = router;
