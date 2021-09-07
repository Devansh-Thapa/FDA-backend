const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const donationBagSchema = new Schema(
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
      ref: "User",
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
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
      ref: "User",
    },
    updated: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DonationBag", donationBagSchema);

// const DonationBag = mongoose.model("DonationBag", donationBagSchema);

// const donationSchema = new Schema(
//   {
//     donationBag: [donationBagSchema],
//     contactNumber: {
//       type: Number,
//     },
//     address: {
//       type: String,
//     },
//     status: {
//       type: String,
//       default: "Available",
//       enum: ["Canceled", "Delivered", "Processing", "Availabe", "Expired"],
//     },
//     updated: {
//       type: Date,
//     },
//     user: {
//       type: ObjectId,
//       ref: "user",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Donation = mongoose.model("Donation", donationSchema);

// module.exports = { Donation, DonationBag };
