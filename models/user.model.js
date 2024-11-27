const mongoose = require("mongoose");

const userSchema = new mongoose(
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

module.exports = mongoose.model("user", userSchema);
