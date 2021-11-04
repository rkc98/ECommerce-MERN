const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(resetPassword);

module.exports = router;
