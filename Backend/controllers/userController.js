const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtTokens");

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

    // const token = user.generateJwtToken(); //generate token for the user

    // res.status(201).json({
    //   message: "user registered successfully",
    //   user,
    //   token,
    // });
    sendToken(user, 201, res);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};

//login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler("please enter your email-id and password", 404)
    );
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    // to get password in response we have used select here
    //because while creating userschema we had set it to false

    if (!user) {
      return next(new ErrorHandler("Invalid email-id and password", 401));
    }

    const passwordMatched = user.comparePassword(password);
    if (!passwordMatched) {
      return next(new ErrorHandler("Invalid email-id and password", 401));
    }
    // const token = user.generateJwtToken(); //generate token for the user

    // res.status(200).json({
    //   message: "user loggedin successfully",
    //   token,
    // });

    sendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};

//logout User

exports.logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "user logged out successfully",
  });
};
