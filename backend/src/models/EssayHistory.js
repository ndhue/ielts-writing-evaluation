const mongoose = require('mongoose');

const EssayHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topic_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Topic' }, 
  essay_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Essay' },
  ai_output: Object,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EssayHistory', EssayHistorySchema);
