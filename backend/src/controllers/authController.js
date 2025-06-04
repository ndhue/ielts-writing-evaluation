const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../services/nodemailer");
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email has already been registered." });
    }
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const token = jwt.sign(
      { email, name, password_hash, authProvider: "local" },
      process.env.JWT_REGISTER_SECRET,
      { expiresIn: "10m" }
    );

    const confirmLink = `${process.env.HOST}?token=${token}`;
    const subject = "Xác nhận đăng ký tài khoản";
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">Chào ${name},</h2>
        <p>Bạn vừa đăng ký tài khoản tại <strong>Hệ thống IELTS Writing</strong>.</p>
        <p>Vui lòng xác nhận đăng ký của bạn bằng cách nhấn vào nút bên dưới:</p>
        <a href="${confirmLink}" 
          style="display: inline-block; margin-top: 10px; padding: 10px 20px; background:#007BFF; color:#fff; text-decoration: none; border-radius: 4px;">
          Xác nhận đăng ký
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #777;">
          Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.
        </p>
      </div>
    `;

    await sendEmail.sendEmail(email, subject, html);
    res
      .status(200)
      .json({ message: "Vui lòng kiểm tra email để xác nhận đăng ký." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Lỗi server khi xử lý đăng ký." });
  }
};

exports.confirmRegister = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token không hợp lệ" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_REGISTER_SECRET);
    const { email, name, password_hash } = decoded;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    const newUser = new User({
      email,
      name,
      password_hash,
      authProvider: "local",
    });

    await newUser.save();
    res.json({ message: "Xác nhận đăng ký thành công" });
  } catch (err) {
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }
    if (user.authProvider !== "local") {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }
    user.lastLoginAt = new Date();
    await user.save();
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: "Đăng nhập thành công",
      token,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server" });
  }
};

//Login google
exports.googleLoginCallback = async (req, res) => {
  const user = req.user;

  try {
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === 'production',
      secure: false,
      //sameSite: 'Strict',
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === 'production',
      secure: false,
      //sameSite: 'Strict',
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Đăng nhập Google thành công",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server" });
  }
};
//Create access token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Không có refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token không hợp lệ" });
    }

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ token: newAccessToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Refresh token không hợp lệ hoặc đã hết hạn" });
  }
};

//Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account does not exist" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_RESET_SECRET,
      { expiresIn: "10m" }
    );
    const resetLink = `${process.env.RESETPASSWORD}?token=${token}`;
    const subject = "Khôi phục mật khẩu tài khoản IELTS AI";
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Yêu cầu khôi phục mật khẩu</h2>
        <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p>Nhấn vào nút bên dưới để thiết lập lại mật khẩu:</p>
        <a href="${resetLink}" style="display:inline-block; padding:10px 20px; background:#007BFF; color:#fff; text-decoration:none; border-radius:5px;">Đặt lại mật khẩu</a>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
      </div>
    `;

    await sendEmail.sendEmail(email, subject, html);

    res.status(200).json({ message: "Vui lòng kiểm tra email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const { userId } = decoded;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Tài khoản không tồn tại hoặc không hợp lệ." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password_hash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Đặt lại mật khẩu thành công." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  }
};

//logout
exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Thiếu refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    user.refreshToken = "";
    await user.save();

    res.json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(403)
      .json({ message: "Refresh token không hợp lệ hoặc đã hết hạn" });
  }
};
