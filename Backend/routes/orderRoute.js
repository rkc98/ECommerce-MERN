const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(authenticateUser, newOrder); // create a new user by loggen in user
router.route("/order/:id").get(authenticateUser, getSingleOrder); // get order by id

router.route("/orders/me").get(authenticateUser, getUserOrders); //get all of your orders for logged in user
router
  .route("/orders")
  .get(authenticateUser, authorizeRoles("admin"), getAllOrders); // get All orders (Admin only route)

router
  .route("/order/:id")
  .put(authenticateUser, authorizeRoles("admin"), updateOrder);

router
  .route("/order/:id")
  .delete(authenticateUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
