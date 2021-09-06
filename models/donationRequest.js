const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const donationRequestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    contactNumber: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Available",
      enum: ["Accepted", "Available", "Expired"],
    },
    acceptedBy: {
      type: ObjectId,
      ref: "user",
    },
    updated: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DonationRequest", donationRequestSchema);
