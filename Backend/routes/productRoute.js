const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
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

module.exports = router;
