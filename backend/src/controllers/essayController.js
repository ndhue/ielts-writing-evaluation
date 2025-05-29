const callModelAi = require('../services/ai');
const { Topic } = require('../models/Topic');
const Essay = require('../models/Essay');
const EssayHistory = require('../models/EssayHistory');
const AiResults = require('../models/AIResults');


async function submitEssay(req, res) {
  const { topic, essay } = req.body;
  if (!topic || !essay) {
    return res.status(400).json({
      success: false,
      message: 'Chủ đề và bài luận không được để trống!'
    });
  }
  // Nếu chưa đăng nhập -> chỉ trả về kết quả AI, không lưu DB
  if (!req.user || !req.user.userId) {
    try {
      const prediction = await callModelAi.callAIModel(topic, essay);
      return res.status(200).json({
        success: true,
        message: 'Đăng nhập để lưu lại lịch sử.',
        ai_output: prediction
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi gọi mô hình AI.',
        error: error.message
      });
    }
  }
  // Nếu đã đăng nhập -> lưu topic, essay, lịch sử
  const userId = req.user.userId;

  try {
    const resultTopic = await Topic.findOne({ topic });
    let topicId;

    if (!resultTopic) {
      const newTopic = new Topic({
        topic,
        is_generated: false,
        created_by: userId,
      });
      const savedTopic = await newTopic.save();
      topicId = savedTopic._id;
    } else {
      topicId = resultTopic._id;
    }

    const prediction = await callModelAi.callAIModel(topic, essay);

    const newEssay = new Essay({
      user_id: userId,
      topic_id: topicId,
      essay
    });
    const essayResult = await newEssay.save();

    const essayHistory = new EssayHistory({
      user_id: userId,
      topic_id: topicId,
      essay_id: essayResult._id,
      ai_output: prediction
    });

    const aiResult = new AiResults({
      essay_id: essayResult._id,
      ai_output: prediction
    });

    await Promise.all([essayHistory.save(), aiResult.save()]);

    res.json({
      success: true,
      result: {
        essay: essayResult,
        aiPrediction: aiResult
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi xử lý dữ liệu!',
      error: error.message
    });
  }
}

async function getEssayHistory(req, res) {
    const userId = req.user.userId;
    const topicId = req.query.topic_id;

    try {
        const essayHistories = await EssayHistory.find({ 
            user_id: userId, 
            topic_id: topicId 
        }).populate('essay_id');

        if (!essayHistories || essayHistories.length === 0) {
            return res.status(404).json({ error: 'Không có bài viết nào cho chủ đề này.' });
        }

        res.status(200).json({
            success: true,
            data: essayHistories
        });
    } catch (err) {
        console.error('Get essay error:', err);
        res.status(500).json({ error: 'Lỗi server khi lấy bài viết' });
    }
};
async function getFeedbackHistory(req, res) {
    const userId = req.user.userId;
    try {
        const histories = await EssayHistory.find({ user_id: userId })
            .populate('essay_id')   
            .populate('topic_id')   
            .sort({ created_at: -1 }); 
        if (!histories.length) {
            return res.status(200).json({
                success: true,
                data: [],
                stats: {
                    highest: null,
                    lowest: null,
                    average: null,
                    total: 0
                },
                recent: []
            });
        }
        const scores = histories.map(h => h.ai_output?.band_scores?.overall?.score || 0);
        const highest = Math.max(...scores);
        const lowest = Math.min(...scores);
        const average = parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1));
        const total = scores.length;

        const result = histories.map(h => ({
            id: h._id,
            topic: h.topic_id?.topic || '',
            essay: h.essay_id?.essay || '',
            result: h.ai_output,
            created_at: h.created_at
        }));
        const recent = result.slice(0, 5).map(item => ({
            date: item.created_at,
            score: item.score
        }));

        res.status(200).json({
            success: true,
            data: result,
            stats: {
                highest,
                lowest,
                average,
                total
            },
            recent
        });
    } catch (err) {
        console.error('Error fetching essay history:', err);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};


async function getResultEssaydetail (req, res) {
    const userId = req.user.userId;
    const essayId = req.query.essay_id

    try {
        const essay = await Essay.find({ _id: essayId, user_id: userId });
        if (!essay) {
            return res.status(403).json({ error: 'Bạn không có quyền truy cập bài viết này.' });
        }

        const result = await AiResults.find({ essay_id: essayId });

        if (!result) {
            return res.status(404).json({ error: 'Không tìm thấy kết quả chấm điểm.' });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        console.error('Get result error:', err);
        return res.status(500).json({ error: 'Lỗi máy chủ khi lấy kết quả.' });
    }
};
async function getAllResultEssay(req, res) {
    const userId = req.user.userId;

    try {
        const essays = await Essay.find({ user_id: userId });

        if (!essays || essays.length === 0) {
            return res.status(404).json({ error: 'Người dùng chưa có bài viết nào.' });
        }
        const essayIds = essays.map(essay => essay._id);

        const results = await AiResults.find({ essay_id: { $in: essayIds } });

        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy kết quả chấm điểm nào.' });
        }

        return res.status(200).json({
            success: true,
            data: results
        });
    } catch (err) {
        console.error('Get all results error:', err);
        return res.status(500).json({ error: 'Lỗi máy chủ khi lấy kết quả.' });
    }
}
module.exports = { submitEssay, getEssayHistory, getFeedbackHistory, getResultEssaydetail, getAllResultEssay };
