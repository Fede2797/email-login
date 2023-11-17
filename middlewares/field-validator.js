const { validationResult } = require('express-validator');

const validateFields = ( req, res, next ) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ){
      return res.status(400).json(errors);
  }

  next();
}

const validateCode = ( req, res, next ) => {
  const regex = /^\d{4}$/;

  if ( !regex.test( req.body.verificationcode ) ) {
    return res.status(400).send("Invalid verification code");
  }

  next();
}

module.exports = {
  validateFields,
  validateCode
}