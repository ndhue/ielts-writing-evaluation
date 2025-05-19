const mongoose = require('mongoose');

const EssaySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  topic_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Topic' }, 
  essay: { type: String, required: true },
  submitted_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Essay', EssaySchema);
