const DonationBag = require("../models/donationBag");

//Get donation bag by ID
exports.getDonationBagById = (req, res, next, id) => {
  DonationBag.findById(id).exec((err, donationBag) => {
    if (err) {
      return res.status(400).json({
        error: "Donation bag  not found!!",
      });
    }
    req.donationBag = donationBag;
    next();
  });
};

//Get donation bag
exports.getDonationBag = (req, res) => {
  return res.json(req.donationBag);
};

//Get donation bags by user ID
exports.getDonationBagByUserId = (req, res) => {
  // console.log(req.params.userId);
  DonationBag.find({
    $or: [{ user: req.params.userId }, { acceptedBy: req.params.userId }],
    status: req.query.status,
  })
    .populate("user", "name")
    .populate("acceptedBy", "name")
    .exec((err, donationBags) => {
      if (err) {
        return res.status(400).json({
          error: "No donation bag found!!",
        });
      }
      res.json(donationBags);
    });
};

//Create donation bag
exports.createDonationBag = (req, res) => {
  // console.log("BODY:", req.body);
  const donationBag = new DonationBag({ ...req.body, user: req.params.userId });
  donationBag.save((err, donationBag) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({
        error: "Unable to save donation bag!!",
        err: err,
      });
    }
    res.json({ donationBag });
  });
};

//Get all donation bags
exports.getAllDonationBags = (req, res) => {
  DonationBag.find().exec((err, donationBags) => {
    if (err) {
      return res.status(400).json({
        error: "No donation bag found.",
      });
    }
    res.json(donationBags);
  });
};

// Get availabe donation bags
exports.getAvailableDonationBags = (req, res) => {
  var filter = {
    status: "Available",
    user: { $ne: req.params.userId },
  };

  // console.log("category:", req.query.category);
  if (req.query.category != "undefined") {
    filter["category"] = req.query.category;
  }

  // console.log("state:", req.query.state);
  if (req.query.state != "undefined") {
    filter["state"] = req.query.state;
  }

  // console.log("city:", req.query.city);
  if (req.query.city != "undefined") {
    filter["city"] = req.query.city;
  }

  // console.log("filter", filter);

  DonationBag.find(filter)
    .populate("user", "name")
    .exec((err, donationBags) => {
      if (err) {
        // console.log(err, donationBags);
        return res.status(400).json({
          error: err,
        });
      }
      res.json(donationBags);
    });
};

//Update donation bag
exports.updateDonationBag = (req, res) => {
  const donationBag = req.donationBag;
  donationBag.name = req.body.name;
  donationBag.description = req.body.description;
  donationBag.category = req.body.category;
  donationBag.contactNumber = req.body.contactNumber;
  donationBag.city = req.body.city;
  donationBag.state = req.body.state;
  donationBag.address = req.body.address;
  donationBag.save((err, updatedDonationBag) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update donation bag!!",
      });
    }
    res.json(updatedDonationBag);
  });
};

//Remove donation bag
exports.removeDonationBag = (req, res) => {
  const donationBag = req.donationBag;
  donationBag.remove((err, donationBag) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove donation bag!!",
      });
    }
    res.json({
      message: "Removed donation bag successfully.",
    });
  });
};

// Accept donation bag
exports.acceptDonationBag = (req, res) => {
  // console.log(req);
  const donationBag = req.donationBag;
  // console.log(donationBag);
  donationBag.status = "Accepted";
  donationBag.acceptedBy = req.params.userId;
  donationBag.save((err, updatedDonationBag) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update donation bag!!",
      });
    }
    res.json(updatedDonationBag);
  });
};
