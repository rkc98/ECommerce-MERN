const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxlength: [30, "name cannot be more than 30 characters"],
    minlength: [4, "name should have atleast 4 characters"],
  },

  email: {
    type: String,
    required: [true, "enter your email"],
    unique: true,
    validate: [validator.isEmail(), "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [8, "password should be greater than 8 characters"],
    select: false, // will not return password while returning data
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
