const { Router } = require( "express" );
const { check } = require("express-validator");
const { signup } = require("../controllers/signup");
const { validateFields, validateCode } = require("../middlewares/field-validator");
const { userExistsInDB } = require("../middlewares/user-existing-validator");
const { confirmsignup } = require("../controllers/confirmsignup");

const router = Router();

router.post('/', [
    check('email', "Email is mandatory").not().isEmpty(),
    check('email', "Not valid email").isEmail(),
    userExistsInDB,
    validateFields
  ], signup);

router.post('/confirmsignup', [
    check('email', "Email is mandatory").not().isEmpty(),
    check('email', "Not valid email").isEmail(),
    check('verificationcode', "The verification code is mandatory").not().isEmpty(),
    validateCode,
    validateFields
  ], confirmsignup);

module.exports = router;