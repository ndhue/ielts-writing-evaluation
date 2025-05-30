const { generateTopicsFromKeywords } = require('../services/gpt');
const {Topic } = require('../models/Topic');

exports.generateTopics = async (req, res) => {
    const { keywords } = req.body;

    if (!keywords) {
        return res.status(400).json({ error: '"Keywords" là bắt buộc' });
    }
    try {
        const generated = await generateTopicsFromKeywords({ keywords });

        if (!generated || !generated.topic || !Array.isArray(generated.outline) || generated.outline.length === 0) {
            return res.status(400).json({ error: 'Không tạo được chủ đề' });
        }
        const fixedTopics = {
            topic: generated.topic,
            outline: generated.outline.filter(item => item?.trim())
        };
        if (req.user && req.user.userId) {
            const userId = req.user.userId;

            const saveTopic = new Topic({
                topic: fixedTopics.topic,
                description: fixedTopics.outline.join(' '),
                is_generated: true,
                keywords,
                created_by: userId
            });

            const topicResult = await saveTopic.save();

            return res.status(200).json({
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
        } else {
            return res.status(200).json({
                success: true,
                message: 'Tạo topic thành công',
                data: {
                    topic: fixedTopics.topic,
                    description: fixedTopics.outline.join('.')
                }
            });
        }
    } catch (err) {
        console.error('Generate topics error:', err);
        return res.status(500).json({ error: 'Lỗi khi tạo chủ đề' });
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