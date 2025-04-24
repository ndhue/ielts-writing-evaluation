const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/User');
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  accessType: 'offline',
  prompt: 'consent' 
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value || null;
    const avatar = profile.photos?.[0]?.value || null;

    if (!email) {
      return done(new Error('Email not provided by Google'), null);
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name: profile.displayName || 'No Name',
        avatarUrl: avatar,
        authProvider: 'google',
        providerId: profile.id,
        refreshToken
      });
    } else {
      user.refreshToken = refreshToken;
    }

    await user.save();
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

/*const GitHubStrategy = require("passport-github2").Strategy;
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    const [user] = await User.findOrCreate({
      where: { email: profile.emails[0].value },
      defaults: {
        name: profile.displayName,
        avatar_url: profile.photos[0].value,
        auth_provider: "github"
      }
    });
    return done(null, user);
  }));*/
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });