const bcrypt = require('bcrypt');
const { LOGIN_STATE, SIGNUP_STATE } = require('../config/constants');
const User = require('../models/user');

const confirmsignup = async (req, res) => {

  const { email, verificationcode } = req.body;

  const userToConfirm = await User.findOne({ email });

  const match = bcrypt.compare( verificationcode, userToConfirm.hashedCode );

  if ( !match ) {
    res.status(400).send("Verification code doesn't match. Try again");
  } else {
    const updatedFields = {
      state_signup: SIGNUP_STATE.signedup,
      login_signup: LOGIN_STATE.loggedin,
      date_code: new Date(),
    }
    await User.findByIdAndUpdate( userToConfirm._id, updatedFields );
    res.status(200).send("User signed up succesfully");
  
    // TODO: Hacer correo indicando que el usuario fue registrado exitosamente
    // sendMail({ verificationCode, email });
  }
}

module.exports = {
  confirmsignup,
}