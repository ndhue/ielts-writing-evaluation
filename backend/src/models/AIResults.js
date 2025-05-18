const mongoose = require('mongoose');

const AIResultSchema = new mongoose.Schema({
  essay_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Essay', required: true },
  ai_output: { type: Object, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AIResult', AIResultSchema);
