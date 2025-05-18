require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const essayRoutes = require('./routes/essayRoutes');
const cors = require('cors');
require('./config/passport');

const app = express();
app.use(express.json());
connectDB();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,         
    secure: false,           
    sameSite: 'lax'         
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/', topicRoutes);
app.use('/', essayRoutes);

app.listen(3000, () => console.log('Server listening on http://localhost:3000'));
