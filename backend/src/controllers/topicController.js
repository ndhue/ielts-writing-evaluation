const { generateTopicsFromKeywords } = require('../services/gpt');
const {Topic } = require('../models/Topic');

exports.generateTopics = async (req, res) => {
    const {keywords } = req.body;
    const userId = req.user.id;
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

        await saveTopic.save(); 

        res.json(saveTopic);
    } catch (err) {
        console.error('Generate topics error:', err);
        res.status(500).json({ error: 'Failed to generate topics' });
    }
};
