const bcrypt = require('bcrypt');
const { LOGIN_STATE, SIGNUP_STATE } = require('../config/constants');
const User = require('../models/user');
const { sendMail } = require('./helpers/signup');

const confirmsignup = async (req, res) => {

  const { email, verificationcode } = req.body;

  const userToConfirm = await User.findOne({ email });

  const match = await bcrypt.compare( verificationcode, userToConfirm.hashedCode );

  if ( !match ) {
    res.status(400).send("Verification code doesn't match. Try again");
  } else {
    const updatedFields = {
      $set : { state_login: LOGIN_STATE.loggedin },
      state_signup: SIGNUP_STATE.signedup,
      date_code: new Date(),
    }
    await User.findByIdAndUpdate( userToConfirm._id, updatedFields );
    
    const mailOptions = {
      from: `"App login" <${process.env.USER}>`, // sender address
      to: email, // receiver
      subject: "You have succesfully signed up", // Subject line
      text: `Congratulations! You have succesfully signed up on this webpage`, // plain text body
      html: `<h3>Congratulations! You have succesfully signed up on this webpage</h3>`, // html body
    };
    
    sendMail({ mailOptions });

    res.status(200).send("User signed up succesfully");
  }
}

module.exports = {
  confirmsignup,
}