const express = require("express");
const { newOrder } = require("../controllers/orderController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(authenticateUser, newOrder);

module.exports = router;
