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

//getting single order
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(
        new ErrorHandler("order not found with id " + req.params.id, 404)
      );
    }
    res.status(200).json({
      order,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};

// get all orders of a user

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      orders,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};
