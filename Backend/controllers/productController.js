const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");

// Create products
exports.createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id; // passing user id from authentication
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
  const resultPerPage = 8;
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

// Create a new Review or update one
exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    // find whether user has reviewed the product
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          //if user has already reviewed just change the rating and comment
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      await product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }

    let total = 0;
    product.reviews.forEach((rev) => (total += rev.rating));
    product.ratings = avg / product.reviews.length; // calculate the average ratings

    const reviewedProduct = await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      reviewedProduct,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};

//get all reviews of a product

exports.getAllReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return next(
        new ErrorHandler("Product not found with id" + req.query.productId, 404)
      );
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
};

//delete Review of a product

exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return next(
        new ErrorHandler("Product not found with id" + req.query.productId, 404)
      );
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let total = 0;
    reviews.forEach((rev) => {
      total += rev.rating;
    });
    console.log(typeof total, typeof reviews.length);

    let ratings = total / reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings;
    const numberOfReviews = reviews.length;

    console.log(reviews, isNaN(ratings) ? 0 : ratings, numberOfReviews);

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numberOfReviews,
      },
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err, 500));
  }
};
