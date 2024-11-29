const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: [true, "Color is required"],
        minlength: [3, "Color must be atleast 3 characters long"],
      },
      plate: {
        type: String,
        required: [true, "Plate is required"],
        minlength: [3, "Plate must be atleast 3 characters long"],
      },
      capacity: {
        type: Number,
        required: [true, "Capacity is required"],
        minlength: [1, "Capacity must be atleast 1"],
      },
      vehicleType: {
        tyep: String,
        required: [true, "Vehicle type is required"],
        enum: ["car", "motorcycle", "auto"],
      },
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

captainSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model("captain", captainSchema);
