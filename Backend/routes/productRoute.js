const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts); //get All products

router
  .route("/products/new")
  .post(authenticateUser, authorizeRoles("admin"), createProduct); // create product (Admin only)

router
  .route("/product/:id")
  .put(authenticateUser, authorizeRoles("admin"), updateProduct); // update product (Admin only)

router
  .route("/product/:id")
  .delete(authenticateUser, authorizeRoles("admin"), deleteProduct); // delete product (Admin only)

router.route("/product/:id").get(getProductDetails); // get a single products details

router.route("/review").put(authenticateUser, createProductReview); // add product review

router.route("/reviews").get(getAllReviews); //get all reviews for a product

router.route("/reviews").delete(authenticateUser, deleteReview); // delete a review

module.exports = router;
