const express = require("express");
const router = express.Router();
const {
  generateTopics,
  getAllTopics,
  getTopicsIsGenerated,
  removeTopic,
} = require("../controllers/topicController");
const { authenticateToken } = require("../middleware/auth");
router.post("/topic/generate", authenticateToken, generateTopics);
router.get("/topic/getalltopic", authenticateToken, getAllTopics);
router.get(
  "/topic/gettopicisgenerate",
  authenticateToken,
  getTopicsIsGenerated
);
router.delete("/topic/:topicId", authenticateToken, removeTopic);
module.exports = router;
