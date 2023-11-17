const { SIGNUP_STATE } = require('../config/constants');
const User = require('../models/user');
const { generateVerificationCode, getHashCode, sendMail } = require('./helpers/signup');

const signup = async (req, res) => {

  const { email } = req.body;
  const { userExisting } = req?.body;

  // Generates a verification code
  const verificationCode = generateVerificationCode();

  // Encrypts the code
  const hashedCode = await getHashCode(verificationCode);

  if ( !userExisting ) {
    // Creates new user
    const newUser = new User({ 
      email, 
      hashedCode, 
      state_signup: SIGNUP_STATE.pending, 
      date_code: new Date(),
    });
    // Saves the user on the DB
    await newUser.save();
    res.status(200).send("New user created");
  } else {

    // Edit the already existing user
    const updatedFields = {
      hashedCode,
      state_signup: SIGNUP_STATE.pending,
      date_code: new Date(),
    }
    await User.findByIdAndUpdate( userExisting._id, updatedFields );
    res.status(200).send("Verification code updated");
  }

  sendMail({ verificationCode, email });
}

module.exports = {
  signup,
}