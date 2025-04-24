const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { FLOAT } = require('sequelize');
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password_hash:{type: String},
  name: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  target: { type: Number, default: null },
  description: { type: String, default: '' },
  authProvider: { type: String, default: 'local' },
  providerId: { type: String, default: '' },
  refreshToken: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date, default: null },
});



const User = mongoose.model('User', userSchema);
module.exports = User;

