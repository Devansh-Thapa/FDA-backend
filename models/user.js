const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlenght: 32,
      trim: true,
    },
    lastName: {
      type: String,
      // required: true,
      maxlenght: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    number: {
      type: Number,
      // required: true,
      // unique: true,
      trim: true,
    },
    address: {
      type: String,
      maxlength: 100,
      // required: true,
      // unique: true,
      trim: true,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1,
    },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//TODO
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encryptedPassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encryptedPassword;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};
//

module.exports = mongoose.model("User", userSchema);
