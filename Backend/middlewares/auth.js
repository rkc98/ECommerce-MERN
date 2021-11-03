const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      next(new ErrorHandler("token not available please login", 400));
    }
    const decodedTokenData = jwt.decode(token, process.env.JWTSECRET);
    console.log(token);
    req.user = await User.findById(decodedTokenData.id);
    next();
  } catch (err) {
    next(new ErrorHandler("internal server error", 404));
  }
};

module.exports = authenticateUser;
