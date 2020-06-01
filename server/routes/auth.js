const express = require("express");
const { body } = require("express-validator");

const User = require("../modles/user");
const router = express.Router();
const authController = require("../controllers/auth");


router.post(
  "/signup",
  [
    body("email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) return Promise.reject("email adress exist already");
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);


module.exports = router;
