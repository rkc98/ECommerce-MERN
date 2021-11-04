const ErrorHandler = require("../utils/errorhandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  //Wrong mongoDb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate ker error
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} id`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt token found
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid Json Token`;
    err = new ErrorHandler(message, 400);
  }

  // Jwt Expire Error
  if (err.name === "TokenExpireError") {
    const message = `Token has Expired please try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
    status: err.statusCode,
  });
};
