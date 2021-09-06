const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

//Controllers
const {
  signout,
  signin,
  signup,
  isSignedIn,
} = require("../controllers/authentication");

//Routes

//Signup
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("Must be at least 5 character long"),
    check("email").isEmail().withMessage("Must br 5 character long"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 Character long"),
  ],
  signup
);

//Signin
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required!!"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password field required!!"),
  ],
  signin
);

//Signout
router.get("/signout", signout);

//testing route
router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
