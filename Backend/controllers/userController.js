const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

//Register a user

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "this is a demo id",
        url: "smaple/url",
      },
    });

    const token = user.generateJwtToken(); //generate token for the user

    res.status(201).json({
      message: "user registered successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};
