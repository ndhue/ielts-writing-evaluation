const bcrypt = require('bcrypt');
const User = require('../models/User');
exports.updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { name, avatarUrl, newPassword,target,description } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' }); 
      if (name) user.name = name;
      if (avatarUrl) user.avatarUrl = avatarUrl;
      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(newPassword, salt);
      }
      if (target) user.target = target;
      if(description) user.description=description;
      await user.save();
      res.json({
        message: 'Cập nhật thông tin thành công',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          target: user.target,
          description: user.description
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server' });
    }
  };