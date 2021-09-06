const express = require("express");

const router = express.Router();

const {
  getDonationRequest,
  getDonationRequestById,
  getDonationRequestByUserId,
  getAllDonationRequests,
  createDonationRequest,
  updateDonationRequest,
  removeDonationRequest,
  getAvailableDonationRequests,
  acceptDonationRequest,
} = require("../controllers/donationRequest");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");

const { getUserById } = require("../controllers/user");

//Router parameters
router.param("userId", getUserById);
router.param("donationRequestId", getDonationRequestById);

//Routes

//Create donation Request
router.post(
  "/user/:userId/donationRequest/create",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createDonationRequest
);

//Find a donation Request by ID
router.get("/donationRequest/:donationRequestId", getDonationRequest);

//Find all donation Requests
router.get("/donationRequests", getAllDonationRequests);

//Find donation Request by user ID
router.get(
  "/user/:userId/donationRequests",
  isSignedIn,
  isAuthenticated,
  getDonationRequestByUserId
);

//Find available donation bag
router.get(
  "/user/:userId/availableDonationRequests",
  isSignedIn,
  isAuthenticated,
  getAvailableDonationRequests
);

//Update donation Requests
router.put(
  "/user/:userId/donationRequest/:donationRequestId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateDonationRequest
);

//Delete donation Request
router.delete(
  "/user/:userId/donationRequest/:donationRequestId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeDonationRequest
);

//Accept donation request
router.put(
  "/user/:userId/donationRequest/:donationRequestId/accept",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  acceptDonationRequest
);

module.exports = router;
