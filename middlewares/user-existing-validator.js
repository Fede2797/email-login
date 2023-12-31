const User = require('../models/user');

const userExistsInDB = async( req, res, next ) => {
  const { email } = req.body;

  const userInDB = await User.findOne({ email });
  if ( userInDB ){
    if ( userInDB.state_signup === "SIGNEDUP" ) {
      throw new Error(`The user with email ${ email } is already signed up`);
    } else {
      req.body.userExisting = userInDB;
    }
  }

  next();
}

const isValidUser = async( req, res, next ) => {
  const { email } = req.body;

  const userInDB = await User.findOne({ email });
  if ( !userInDB ){
    res.status(404).send("User not found");
  } else {
    if ( userInDB.state_signup !== "SIGNEDUP" ) {
      res.status(404).send("User not found");
    } else {
      req.body.userExisting = userInDB;
      next();
    }
  }
}

module.exports = {
  userExistsInDB,
  isValidUser
}