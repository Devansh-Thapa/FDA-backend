const DonationRequest = require("../models/donationRequest");

//Get donation request by ID
exports.getDonationRequestById = (req, res, next, id) => {
  DonationRequest.findById(id).exec((err, donationRequest) => {
    if (err) {
      return res.status(400).json({
        error: "Donation request  not found!!",
      });
    }
    req.donationRequest = donationRequest;
    next();
  });
};

//Get donation bag
exports.getDonationRequest = (req, res) => {
  return res.json(req.donationRequest);
};

//Get donation requests by user ID
exports.getDonationRequestByUserId = (req, res) => {
  //   console.log(req.params.userId);
  DonationRequest.find({ user: req.params.userId }).exec(
    (err, donationRequests) => {
      if (err) {
        return res.status(400).json({
          error: "No donation request found!!",
        });
      }
      res.json(donationRequests);
    }
  );
};

//Create donation request
exports.createDonationRequest = (req, res) => {
  //   console.log(req.body);
  const donationrequest = new DonationRequest({
    ...req.body,
    user: req.params.userId,
  });
  donationrequest.save((err, donationRequest) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Unable to save donation request!!",
        err: err,
      });
    }
    res.json({ donationRequest });
  });
};

//Get all donation requests
exports.getAllDonationRequests = (req, res) => {
  DonationRequest.find().exec((err, donationRequests) => {
    if (err) {
      return res.status(400).json({
        error: "No donation request found.",
      });
    }
    res.json(donationRequests);
  });
};

// Get availabe donation requests
exports.getAvailableDonationRequests = (req, res) => {
  DonationRequest.find({
    status: "Available",
    user: { $ne: req.params.userId },
  }).exec((err, donationRequests) => {
    if (err) {
      return res.status(400).json({
        error: "No donation bag found.",
      });
    }
    res.json(donationRequests);
  });
};

//Update donation request
exports.updateDonationRequest = (req, res) => {
  const donationRequest = req.donationRequest;
  donationRequest.name = req.body.name;
  donationRequest.save((err, updatedDonationRequest) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update donation request!!",
      });
    }
    res.json(updatedDonationRequest);
  });
};

//Remove donation request
exports.removeDonationRequest = (req, res) => {
  const donationRequest = req.donationRequest;
  donationRequest.remove((err, donationRequest) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove donation request!!",
      });
    }
    res.json({
      message: "Removed donation request successfully.",
    });
  });
};

// Accept donation request
exports.acceptDonationRequest = (req, res) => {
  console.log(req);
  const donationRequest = req.donationRequest;
  console.log(donationRequest);
  donationRequest.status = "Accepted";
  donationRequest.acceptedBy = req.params.userId;
  donationRequest.save((err, updatedDonationRequest) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update donation Request!!",
      });
    }
    res.json(updatedDonationRequest);
  });
};
