const express = require("express");
const { newOrder, getSingleOrder } = require("../controllers/orderController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(authenticateUser, newOrder);
router.route("/order/:id").get(authenticateUser, getSingleOrder);

module.exports = router;
