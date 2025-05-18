const bcrypt = require('bcrypt');
const User = require('../models/User');
exports.updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { name, avatarUrl,target,description } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' }); 
      if (name) user.name = name;
      if (avatarUrl) user.avatarUrl = avatarUrl;
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
exports.changePassword = async (req, res) =>{
  const userId = req.user.userId;
  const {oldPassword,newPassword }= req.body;
  try {
    const user = await User.findById(userId);
    if (user.authProvider !== 'local') {
      return res.status(401).json({ message: 'Không thể đổi mật khẩu với tài khoản đăng nhập bằng tài khoản google.' });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword_hash = await bcrypt.hash(newPassword, salt);
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({ message: 'Mật khẩu cũ không đúng' });
    }
    user.password_hash = newPassword_hash;
    await user.save();
      res.json({
        message: 'Cập nhật mật khẩu thành công',
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
}
exports.getProfile = async (req, res) => {
    const userId = req.user.userId;
    try {
        
        const profile = await User.findById(userId);
        
        if (!profile) {
            return res.status(403).json({ error: 'Không có quyền truy cập' });
        }
        res.status(200).json({
            success: true,
            data: {
            name: profile.name,
            email: profile.email,
            target: profile.target,
            description: profile.description,
            avatarUrl: profile.avatarUrl
          }
        });
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ error: 'Failed to get profile' });
    }
};