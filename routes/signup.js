const { Router } = require( "express" );
const { check } = require("express-validator");
const { signup } = require("../controllers/signup");
const { validateFields } = require("../middlewares/field-validator");
const { userSignedUp } = require("../helpers/db-validators");

const router = Router();

router.post('/', [
    check('email', "Email is mandatory").not().isEmpty(),
    check('email', "Not valid email").isEmail(),
    check('email', "User already signed up").custom( userSignedUp ),
    validateFields
  ], signup);

module.exports = router;