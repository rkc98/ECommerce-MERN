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

// get all Orders (Admin Only)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => (totalAmount += order.totalPrice));

    res.status(200).json({
      orders,
      totalAmount,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};

//Update order status for admin
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(
        new ErrorHandler("order not found with id " + req.params.id, 404)
      );
    }

    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("order is already delivered", 404));
    }

    order.orderItems.forEach(
      async (ord) => await updateStock(ord.product, ord.quantity)
    );

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = Order.findById(req.params.id);
    if (!order) {
      return next(
        new ErrorHandler("order not found with id " + req.params.id, 404)
      );
    }

    await order.remove();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};
