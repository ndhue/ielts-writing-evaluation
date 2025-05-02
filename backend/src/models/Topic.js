const mongoose= require ('mongoose');
const topicSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  description: { type: [String], default: [] },
  is_generated: { type: Boolean, default: false },
  keywords: { type: [String], default: [] },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
});
const Topic = mongoose.model('Topic', topicSchema);
module.exports = {Topic};