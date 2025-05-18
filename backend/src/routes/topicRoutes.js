const express = require('express');
const router = express.Router();
const {generateTopics, getAllTopics, getTopicsIsGenerated} = require ('../controllers/topicController');
const { authenticateToken } = require('../middleware/auth');
router.post('/topic/generate',authenticateToken,generateTopics);
router.get('/topic/getalltopic',authenticateToken,getAllTopics);
router.get('/topic/gettopicisgenerate',authenticateToken,getTopicsIsGenerated);
module.exports = router;