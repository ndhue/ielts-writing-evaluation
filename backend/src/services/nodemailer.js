const nodemailer = require('nodemailer');

// transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASSWORD 
  }
});

// Sent email
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: to, 
      subject: subject,
      html: htmlContent
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
