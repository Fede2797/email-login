const { Router } = require( "express" );
const { check } = require("express-validator");
const { signup } = require("../controllers/signup");
const { validateFields } = require("../middlewares/field-validator");
const { userExistsInDB } = require("../middlewares/user-existing-validator");

const router = Router();

router.post('/', [
    check('email', "Email is mandatory").not().isEmpty(),
    check('email', "Not valid email").isEmail(),
    userExistsInDB,
    validateFields
  ], signup);

module.exports = router;