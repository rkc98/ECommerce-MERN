const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  getUserDetails,
} = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(authenticateUser, getUserDetails);

module.exports = router;
