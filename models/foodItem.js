const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const foodItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "category",
      required: true,
    },
    donationBag: {
      type: ObjectId,
      ref: "donationbag",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FootItem", foodItemSchema);
