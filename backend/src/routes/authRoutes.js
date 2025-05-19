const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register,confirmRegister,forgotPassword,resetPassword, login,googleLoginCallback, refreshToken, logout } = require('../controllers/authController');
const { updateProfile, changePassword, getProfile} = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');


router.post('/register', register);
router.post('/confirm-register', confirmRegister);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login', login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  googleLoginCallback
);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.patch('/update-profile', authenticateToken, updateProfile);
router.put('/change-password',authenticateToken,changePassword);
router.get('/getProfile',authenticateToken,getProfile);
module.exports = router;
