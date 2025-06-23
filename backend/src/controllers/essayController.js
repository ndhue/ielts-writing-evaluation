const callModelAi = require("../services/ai");
const { Topic } = require("../models/Topic");
const Essay = require("../models/Essay");
const EssayHistory = require("../models/EssayHistory");
const AiResults = require("../models/AIResults");

async function submitEssay(req, res) {
  const { topic, essay } = req.body;
  if (!topic || !essay) {
    return res.status(400).json({
      success: false,
      message: "Chủ đề và bài luận không được để trống!",
    });
  }
  // Nếu chưa đăng nhập -> chỉ trả về kết quả AI, không lưu DB
  if (!req.user || !req.user.userId) {
    try {
      const prediction = await callModelAi.callAIModel(topic, essay);
      return res.status(200).json({
        success: true,
        message: "Đăng nhập để lưu lại lịch sử.",
        ai_output: prediction,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi gọi mô hình AI.",
        error: error.message,
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
      essay,
    });
    const essayResult = await newEssay.save();

    const essayHistory = new EssayHistory({
      user_id: userId,
      topic_id: topicId,
      essay_id: essayResult._id,
      ai_output: prediction,
    });

    const aiResult = new AiResults({
      essay_id: essayResult._id,
      ai_output: prediction,
    });

    await Promise.all([essayHistory.save(), aiResult.save()]);

    res.json({
      success: true,
      result: {
        essay: essayResult,
        aiPrediction: aiResult,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi xử lý dữ liệu!",
      error: error.message,
    });
  }
}

async function getEssayHistory(req, res) {
  const userId = req.user.userId;
  const topicId = req.query.topic_id;

  try {
    const essayHistories = await EssayHistory.find({
      user_id: userId,
      topic_id: topicId,
    }).populate("essay_id");

    if (!essayHistories || essayHistories.length === 0) {
      return res
        .status(404)
        .json({ error: "Không có bài viết nào cho chủ đề này." });
    }

    res.status(200).json({
      success: true,
      data: essayHistories,
    });
  } catch (err) {
    console.error("Get essay error:", err);
    res.status(500).json({ error: "Lỗi server khi lấy bài viết" });
  }
}
async function getFeedbackHistory(req, res) {
  const userId = req.user.userId;
  const {
    search,
    sortBy = "created_at",
    sortOrder = "desc",
    fromDate,
    toDate,
    page = 1,
    limit = 10,
  } = req.query;

  try {
    let query = { user_id: userId };
    let sort = {};

    if (fromDate || toDate) {
      query.created_at = {};
      if (fromDate) query.created_at.$gte = new Date(fromDate);
      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);
        query.created_at.$lte = endDate;
      }
    }

    if (sortBy === "score") {
      sort = { created_at: sortOrder === "asc" ? 1 : -1 };
    } else {
      sort = { created_at: sortOrder === "asc" ? 1 : -1 };
    }

    // Lấy tất cả để filter search và tính stats
    let allHistories = await EssayHistory.find(query)
      .populate("essay_id")
      .populate("topic_id")
      .sort(sort);

    if (search) {
      const searchLower = search.toLowerCase();
      allHistories = allHistories.filter((h) => {
        const topicMatch = (h.topic_id?.topic || "")
          .toLowerCase()
          .includes(searchLower);
        const essayMatch = (h.essay_id?.essay || "")
          .toLowerCase()
          .includes(searchLower);
        return topicMatch || essayMatch;
      });
    }

    if (sortBy === "score") {
      allHistories.sort((a, b) => {
        const scoreA = a.ai_output?.band_scores?.overall?.score || 0;
        const scoreB = b.ai_output?.band_scores?.overall?.score || 0;
        return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA;
      });
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginated = allHistories.slice(startIndex, endIndex);

    // Stats
    const scores = allHistories.map(
      (h) => h.ai_output?.band_scores?.overall?.score || 0
    );
    const stats = scores.length
      ? {
          highest: Math.max(...scores),
          lowest: Math.min(...scores),
          average:
            Math.round(
              (scores.reduce((a, b) => a + b, 0) / scores.length) * 2
            ) / 2,
          total: scores.length,
        }
      : { highest: null, lowest: null, average: null, total: 0 };

    const result = paginated.map((h) => ({
      id: h._id,
      topic: h.topic_id?.topic || "",
      essay: h.essay_id?.essay || "",
      result: h.ai_output,
      created_at: h.created_at,
    }));

    const recentHistories = await EssayHistory.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(5);
    const recent = recentHistories.map((item) => ({
      date: item.created_at,
      score: item.ai_output?.band_scores?.overall?.score || 0,
    }));

    res.status(200).json({
      success: true,
      data: result,
      stats,
      recent,
      pagination: {
        total: allHistories.length,
        hasMore: endIndex < allHistories.length,
        page: pageNum,
      },
    });
  } catch (err) {
    console.error("Error fetching essay history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}

async function getResultEssaydetail(req, res) {
  const userId = req.user.userId;
  const essayId = req.query.essay_id;

  try {
    const essay = await Essay.find({ _id: essayId, user_id: userId });
    if (!essay) {
      return res
        .status(403)
        .json({ error: "Bạn không có quyền truy cập bài viết này." });
    }

    const result = await AiResults.find({ essay_id: essayId });

    if (!result) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy kết quả chấm điểm." });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Get result error:", err);
    return res.status(500).json({ error: "Lỗi máy chủ khi lấy kết quả." });
  }
}
async function getAllResultEssay(req, res) {
  const userId = req.user.userId;

  try {
    const essays = await Essay.find({ user_id: userId });

    if (!essays || essays.length === 0) {
      return res
        .status(404)
        .json({ error: "Người dùng chưa có bài viết nào." });
    }
    const essayIds = essays.map((essay) => essay._id);

    const results = await AiResults.find({ essay_id: { $in: essayIds } });

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy kết quả chấm điểm nào." });
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    console.error("Get all results error:", err);
    return res.status(500).json({ error: "Lỗi máy chủ khi lấy kết quả." });
  }
}
async function getFeedbackHistoryDetail(req, res) {
  const userId = req.user.userId;
  const historyId = req.query.historyId;

  try {
    // Find the specific essay history by ID and ensure it belongs to the requesting user
    const history = await EssayHistory.findOne({
      _id: historyId,
      user_id: userId,
    })
      .populate("essay_id")
      .populate("topic_id");

    if (!history) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy đánh giá này hoặc bạn không có quyền truy cập",
      });
    }

    // Format the response data
    const detailData = {
      id: history._id,
      topic: history.topic_id?.topic || "Unknown Topic",
      essay: history.essay_id?.essay || "",
      result: history.ai_output,
      created_at: history.created_at,
    };

    return res.status(200).json({
      success: true,
      data: detailData,
    });
  } catch (err) {
    console.error("Get feedback history detail error:", err);
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi lấy chi tiết đánh giá",
    });
  }
}

module.exports = {
  submitEssay,
  getEssayHistory,
  getFeedbackHistory,
  getResultEssaydetail,
  getAllResultEssay,
  getFeedbackHistoryDetail,
};
