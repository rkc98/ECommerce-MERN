const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

//create new order
exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      order,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};
