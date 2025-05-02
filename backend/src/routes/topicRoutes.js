const express = require('express');
const router = express.Router();
const {generateTopics} = require ('../controllers/topicController');
const { authenticateToken } = require('../middleware/auth');
router.post('/topic/generate',authenticateToken,generateTopics);
module.exports = router;