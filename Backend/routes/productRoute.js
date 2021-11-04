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

router.route("/products").get(getAllProducts);

router
  .route("/products/new")
  .post(authenticateUser, authorizeRoles("admin"), createProduct);

router
  .route("/product/:id")
  .put(authenticateUser, authorizeRoles("admin"), updateProduct);

router
  .route("/product/:id")
  .delete(authenticateUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(authenticateUser, createProductReview);

router.route("/reviews").get(getAllReviews);

router.route("/reviews").delete(authenticateUser, deleteReview);

module.exports = router;
