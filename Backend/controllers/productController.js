const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");

// Create products
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};

exports.getAllProducts = async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  try {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const product = await apiFeatures.query;
    res.status(200).json({ success: true, product, productCount });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};

// update product (only admin)
exports.updateProduct = async (req, res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //to check whether proper object id has been passed or not
    return next(new ErrorHandler("product not found error", 500));
  }
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found error", 500));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};

//delete product

exports.deleteProduct = async (req, res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("product not found error", 500));
  }

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found error", 500));
    }
    // product = await Product.findByIdAndDelete(req.params.id, req.body);
    await product.remove();
    res.status(200).json({
      success: true,
      message: "product deleted sucessfully",
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};

// get product details / get single product

exports.getProductDetails = async (req, res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("product not found error", 500));
  }

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found error", 500));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};