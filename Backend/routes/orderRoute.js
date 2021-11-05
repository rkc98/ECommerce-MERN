const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getUserOrders,
} = require("../controllers/orderController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(authenticateUser, newOrder); // create a new user by loggen in user
router
  .route("/order/:id")
  .get(authenticateUser, authorizeRoles("admin"), getSingleOrder); // get order by id (Admin's only)

router.route("/orders/me").get(authenticateUser, getUserOrders); //get all of your orders for logged in user

module.exports = router;
