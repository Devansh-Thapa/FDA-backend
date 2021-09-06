const express = require("express");

const router = express.Router();

const {
  getCategory,
  getCategoryById,
  getAllCategory,
  createCategory,
  updateCategroy,
  removeCategory,
} = require("../controllers/category");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");

const { getUserById } = require("../controllers/user");

//Router parameters
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Routes

//Create category
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Find a category by ID
router.get("/category/:categoryId", getCategory);

//Find all category
router.get("/categories", getAllCategory);

//Update category
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategroy
);

//Delete category
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
