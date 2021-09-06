const FoodItem = require("../models/foodItem");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//get food item by ID
exports.getFoodItemById = (req, res, next, id) => {
  FoodItem.findById(id).exec((err, foodItem) => {
    if (err) {
      return res.status(400).json({
        error: "Food Item not found",
      });
    }
    req.foodItem = foodItem;
    next();
  });
};

exports.addFoodItem = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    //Destructure the fields
    const { name, quantity, category } = fields;
    const donationBagId = req.params.donationBagId;
    if (!name || !quantity || !category || !donationBagId) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    //TODO restriction on field
    let foodItem = new FoodItem({ ...fields, donationBag: donationBagId });

    //Handling files here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big!!",
        });
      }
      foodItem.photo.data = fs.readFileSync(file.photo.path);
      foodItem.photo.contentType = file.photo.type;
    }

    //Save to DB
    foodItem.save((err, foodItem) => {
      if (err) {
        return res.status(400).json({
          error: "Saving food item in DB failed",
          error: err,
        });
      }
      res.json(foodItem);
    });
  });
};

exports.getFoodItem = (req, res) => {
  return res.json(req.foodItem);
};

//Get food item by donation bag id
exports.getFoodItemByDonationBagId = (req, res) => {
  FoodItem.find({ donationBag: req.params.donationBagId }).exec(
    (err, foodItems) => {
      if (err) {
        return res.status(400).json({
          error: "No food item found",
        });
      }
      res.json(foodItems);
    }
  );
};

//Middleware to get photo

//Remove food item
exports.removeFoodItem = (req, res) => {
  let foodItem = req.foodItem;
  foodItem.remove((err, removedFoodItem) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove the food item",
      });
    }
    res.json({
      message: "Successfully removed the food item",
      foodItem: removedFoodItem,
    });
  });
};

//Update food item
exports.updateFoodItem = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(res, (err, firlds, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    //Updation code
    let foodItem = req.foodItem;
    foodItem = _.extend(foodItem, fields);

    //Handling files here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big!!",
        });
      }
      foodItem.photo.data = fs.readFileSync(file.photo.path);
      foodItem.photo.contentType = file.photo.type;
    }

    //save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product updation in DB failed!!",
          error: err,
        });
      }
      res.json(product);
    });
  });
};
