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
    state_signup: LOGIN_STATE.pending,
    date_code: new Date(),
  }
  await User.findByIdAndUpdate( userExisting._id, updatedFields );
  res.status(200).send("Verification code updated");

  sendMail({ verificationCode, email });
}

module.exports = {
  login,
}