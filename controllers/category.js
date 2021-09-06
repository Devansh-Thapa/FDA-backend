const Category = require("../models/category");

//Get categoty by ID
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category  not found!!",
      });
    }
    req.category = category;
    next();
  });
};

//Get category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

//Create category
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save category.",
      });
    }
    res.json({ category });
  });
};

//Get category
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found.",
      });
    }
    res.json(categories);
  });
};

//Update category
exports.updateCategroy = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updaytedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category.",
      });
    }
    res.json(updatedcategory);
  });
};

//Remove category
exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove category.",
      });
    }
    res.json({
      message: "Removed category successfully.",
    });
  });
};
