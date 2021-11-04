const mongoose = require("mongoose");
const validator = require("validator");
const brycpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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
    validate: [validator.default.isEmail, "please enter a valid email"],
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //to check whether the password was modified or not
    // if it not modified we should not hash that password again
    next();
  }
  this.password = await brycpt.hash(this.password, 10);
});

//generating json webtoken using userid
userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRE,
  });
};
// compare password function
userSchema.methods.comparePassword = async function (enteredPasssword) {
  console.log("entered passowrd", enteredPasssword);
  return await brycpt.compare(enteredPasssword, this.password);
};

//generate reset password Token

userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding reset Password token  to UserSchema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //passing 15 minutes as expire time

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
