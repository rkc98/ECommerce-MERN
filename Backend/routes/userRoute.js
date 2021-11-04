const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  getUserDetails,
  updatePassword,
} = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(authenticateUser, getUserDetails);
router.route("/password/update").put(authenticateUser, updatePassword);

module.exports = router;
