const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateUserDetails,
  getAllUsers,
  getUser,
} = require("../controllers/userController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(authenticateUser, getUserDetails);
router.route("/password/update").put(authenticateUser, updatePassword);
router.route("/me/update").put(authenticateUser, updateUserDetails);
router
  .route("/getAllUsers")
  .get(authenticateUser, authorizeRoles("admin"), getAllUsers); //Admin only route

router
  .route("/getUser/:id")
  .get(authenticateUser, authorizeRoles("admin"), getUser);

module.exports = router;
