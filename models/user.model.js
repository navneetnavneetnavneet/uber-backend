const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be atleast 3 characters long"],
      },
      lastName: {
        type: String,
        minlength: [3, "First name must be atleast 3 characters long"],
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      minlength: [5, "Email must be atleast 5 characters long"],
    },
    password: {
      type: String,
      required: [true, "Email is required"],
      select: false,
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model("user", userSchema);
