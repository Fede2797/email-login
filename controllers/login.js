const User = require('../models/user');
const { LOGIN_STATE } = require('../config/constants');
const { generateVerificationCode, getHashCode, sendMail } = require('./helpers/signup');

const login = async (req, res) => {

  const { email } = req.body;
  const { userExisting } = req?.body;

  // Generates a verification code
  const verificationCode = generateVerificationCode();

  // Encrypts the code
  const hashedCode = await getHashCode(verificationCode);

  // Edit the user code
  const updatedFields = {
    hashedCode,
    state_login: LOGIN_STATE.pending,
    date_code: new Date(),
  }
  await User.findByIdAndUpdate( userExisting._id, updatedFields );
  res.status(200).send("Verification code updated");

  const mailOptions = {
    from: `"App login" <${process.env.USER}>`, // sender address
    to: email, // receiver
    subject: "Your temporary login code", // Subject line
    text: `Here is your temporary login code: ${verificationCode}`, // plain text body
    html: `<h3>Here is your temporary login code: ${verificationCode}</h3>`, // html body
  };

  sendMail({ mailOptions });
}

module.exports = {
  login,
}