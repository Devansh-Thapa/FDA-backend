const express = require("express");

const router = express.Router();

const {
  getDonationBag,
  getDonationBagById,
  getDonationBagByUserId,
  getAllDonationBags,
  createDonationBag,
  updateDonationBag,
  removeDonationBag,
  acceptDonationBag,
  getAvailableDonationBags,
} = require("../controllers/donationBag");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");

const { getUserById } = require("../controllers/user");

//Router parameters
router.param("userId", getUserById);
router.param("donationBagId", getDonationBagById);

//Routes

//Create donation bag
router.post(
  "/user/:userId/donationBag/create",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createDonationBag
);

//Find a donation bag by ID
router.get("/donationBag/:donationBagId", getDonationBag);

//Find all donation bags
router.get("/donationBags", getAllDonationBags);

//Find donation bag by user ID
router.get(
  "/user/:userId/donationBags",
  isSignedIn,
  isAuthenticated,
  getDonationBagByUserId
);

//Find available donation bag
router.get(
  "/user/:userId/availableDonationBags",
  isSignedIn,
  isAuthenticated,
  getAvailableDonationBags
);

//Update donation bags
router.put(
  "/user/:userId/donationBag/:donationBagId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateDonationBag
);

//Delete donation bag
router.delete(
  "/user/:userId/donationBag/:donationBagId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeDonationBag
);

// Accept donation bag
router.put(
  "/user/:userId/donationBag/:donationBagId/accept",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  acceptDonationBag
);
module.exports = router;
