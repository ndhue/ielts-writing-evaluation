const { generateTopicsFromKeywords } = require('../services/gpt');
const {Topic } = require('../models/Topic');

exports.generateTopics = async (req, res) => {
    const {keywords } = req.body;
    const userId = req.user.userId;
    if ((!keywords)) {
        return res.status(400).json({ error: '"Keywords" là bắt buộc' });
    }

    try {
        
        const generateTopics = await generateTopicsFromKeywords({keywords });
        if (!generateTopics || !generateTopics.topic || !Array.isArray(generateTopics.outline) || generateTopics.outline.length === 0) {
            return res.status(400).json({ error: 'Không tạo được chủ đề' });
        }
        const fixedTopics = {
            topic: generateTopics.topic,
            outline: generateTopics.outline.filter(item => item)  
        };
        const saveTopic = new Topic({
            topic: fixedTopics.topic,
            description: fixedTopics.outline.join('; '),
            is_generated: true,
            keywords,
            created_by: userId,
        });

        const topicResult = await saveTopic.save();

        res.status(200).json({
            success: true,
            message: 'Tạo topic thành công',
            data: {
                topic_id: topicResult._id,
                topic: topicResult.topic,
                description: topicResult.description,
                is_generated: topicResult.is_generated,
                keywords: topicResult.keywords,
                created_by: topicResult.created_by,
                created_at: topicResult.created_at
            }
        });
    } catch (err) {
        console.error('Generate topics error:', err);
        res.status(500).json({ error: 'Failed to generate topics' });
    }
};
exports.getAllTopics = async (req, res) => {
    const userId = req.user.userId;
    try {
        
        const allTopic = await Topic.find({ created_by: userId });
        if (!allTopic || allTopic.length === 0){
            return res.status(400).json({ error: 'Không có dữ liệu' });
        }
        res.status(200).json({
            success: true,
            data: allTopic
        });
    } catch (err) {
        console.error('Get topics error:', err);
        res.status(500).json({ error: 'Failed to get topics' });
    }
};
exports.getTopicsIsGenerated = async (req, res) => {
    const userId = req.user.userId;
    try {
        
        const TopicIsGenerate = await Topic.find({  created_by: userId, is_generated: true  });
        if (!TopicIsGenerate){
            return res.status(400).json({ error: 'Không có dữ liệu' });
        }
        res.status(200).json({
            success: true,
            data: TopicIsGenerate
        });
    } catch (err) {
        console.error('Get topics error:', err);
        res.status(500).json({ error: 'Failed to get topics' });
    }
};