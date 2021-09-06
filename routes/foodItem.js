const express = require("express");
const router = express.Router();

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");
const { getDonationBagById } = require("../controllers/donationBag");
const {
  getFoodItemById,
  getFoodItem,
  getFoodItemByDonationBagId,
  addFoodItem,
  removeFoodItem,
  updateFoodItem,
} = require("../controllers/foodItem");

//Router parameters
router.param("userId", getUserById);
router.param("donationBagId", getDonationBagById);
router.param("foodItemId", getFoodItemById);

//Routes

//Add food item
router.post(
  "/user/:userId/donationBag/:donationBagId/foodItem/add",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  addFoodItem
);

//Read routes
router.get("/foodItem/:foodItemId", getFoodItem);

//Get all food items by donation bag id
router.get("/donationbag/:donationBagId/foodItems", getFoodItemByDonationBagId);

//remove food item
router.delete(
  "/user/:userId/foodItem/:foodItemId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeFoodItem
);

//Update food item
router.put(
  "user/:userId/foodItem/:foodItemId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateFoodItem
);

module.exports = router;
