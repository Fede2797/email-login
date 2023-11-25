const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
}

const getHashCode = async (code) => {
  const hashedCode = await bcrypt.hash(code.toString(), 10);
  return hashedCode;
};

const sendMail = ({ mailOptions }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASS,
    },
  });

  // Sends the code via email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email ' + error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent ' + info.response);
      res.send('Email succesfully sent.');
    }
  });
}

module.exports = {
  generateVerificationCode,
  getHashCode,
  sendMail,
}