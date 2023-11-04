const { User } = require('../models/user')

const userSignedUp = async( email ) => {
  const userSignedUp = await User.find({ email });
  if ( userSignedUp ){
    // TODO: Validar que no se dupliquen usuarios en la DB
    if ( userSignedUp.state_signup !== "SIGNEDUP" ) {
      throw new Error(`The user with email ${ email } is already signed up`);
    }
  }
}

module.exports = {
  userSignedUp,
}