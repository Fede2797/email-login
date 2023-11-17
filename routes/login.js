const { Router } = require( "express" );
const { check } = require("express-validator");
const { login } = require("../controllers/login");
const { validateFields } = require("../middlewares/field-validator");
const { isValidUser } = require("../middlewares/user-existing-validator");

const router = Router();

router.get('/', [
    check('email', "Email is mandatory").not().isEmpty(),
    check('email', "Not valid email").isEmail(),
    isValidUser,
    validateFields
  ], login);

module.exports = router;