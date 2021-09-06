const express = require("express");
const router = express.Router();

//Controllers
const { getUser, getUserById, updateUser } = require("../controllers/user");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authentication");

//Router parameters
router.param("userId", getUserById);

//Routes
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
