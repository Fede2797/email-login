const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
}

const getHashCode = async (code) => {
  const hashedCode = await bcrypt.hash(code.toString(), 10);
  return hashedCode;
};

const sendMail = ({ verificationCode, email }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: `"App login" <${process.env.USER}>`, // sender address
    to: email, // receiver
    subject: "This is login code email ✔", // Subject line
    text: `Here is your verification code: ${verificationCode}`, // plain text body
    html: `<b>Here is your verification code: ${verificationCode}</b>`, // html body
  };

  // Sends the code via email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification code: ' + error);
      res.status(500).send('Error sending verification code.');
    } else {
      console.log('Verification code sent: ' + info.response);
      res.send('Verification code succesfully sent.');
    }
  });
}

module.exports = {
  generateVerificationCode,
  getHashCode,
  sendMail,
}