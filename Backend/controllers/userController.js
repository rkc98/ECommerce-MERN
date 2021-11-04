const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtTokens");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");

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

// Forgot Password

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("email id not found", 500));
  }

  // reset password Token and send password reset url via email
  const resetToken = user.getResetPasswordToken();
  try {
    await user.save({ validateBeforeSave: false }); // save the password and expiry
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`; // creating a reset password url

  const message = ` Your Password reset Token is :- \n\n ${resetPasswordUrl} \n\n 
  If you have not requested to change your password
   then please ignore this email  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send successfully to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  //creating hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // validating the expiry of the token
    });
    if (!user) {
      return next(
        new ErrorHandler("reset password token is invalid or has expired", 400)
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      new ErrorHandler("password and confirm password do not match", 400);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    next(new ErrorHandler(err, 404));
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err, 404));
  }
};
