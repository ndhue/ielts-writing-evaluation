const User = require("../models/User");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select(
      "-password_hash -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, target, description } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (target !== undefined) user.target = target;
    if (description !== undefined) user.description = description;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        target: user.target,
        description: user.description,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.authProvider !== "local") {
      return res.status(401).json({
        message:
          "Cannot change password for accounts that login with Google.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword_hash = await bcrypt.hash(newPassword, salt);
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }
    user.password_hash = newPassword_hash;
    await user.save();

    res.json({
      message: "Password changed successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        target: user.target,
        description: user.description,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server" });
  }
};

// Remove avatar
exports.removeAvatar = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.avatarUrl) {
      try {
        // Extract just the filename path from the URL
        const urlParts = user.avatarUrl.split("/");
        const filename = urlParts[urlParts.length - 1];
        const avatarPath = path.join(
          __dirname,
          "../../public/uploads/avatars",
          filename
        );

        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath);
        }
      } catch (err) {
        console.error("Error deleting avatar:", err);
        // Continue even if deletion fails
      }

      user.avatarUrl = null;
      await user.save();
    }

    res.json({ message: "Avatar removed successfully" });
  } catch (error) {
    console.error("Error removing avatar:", error);
    res.status(500).json({ message: "Server error" });
  }
};
