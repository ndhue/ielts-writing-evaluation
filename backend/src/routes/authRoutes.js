const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register,confirmRegister,forgotPassword,resetPassword, login,googleLoginCallback, refreshToken, logout } = require('../controllers/authController');
const { updateProfile} = require('../controllers/profileController');
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





router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.patch('/update-profile', authenticateToken, updateProfile);
module.exports = router;
