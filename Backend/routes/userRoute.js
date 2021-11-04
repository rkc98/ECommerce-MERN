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
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser); // register user
router.route("/login").post(loginUser); // login user
router.route("/logout").get(logoutUser); // logout user
router.route("/password/forgot").post(forgotPassword); // forgot password
router.route("/password/reset/:token").put(resetPassword); // reset Password
router.route("/me").get(authenticateUser, getUserDetails); // get logged in user details (Profile)
router.route("/password/update").put(authenticateUser, updatePassword); // update your password
router.route("/me/update").put(authenticateUser, updateUserDetails); // update user details
router
  .route("/getAllUsers")
  .get(authenticateUser, authorizeRoles("admin"), getAllUsers); //get all users (Admin only route)

router
  .route("/getUser/:id")
  .get(authenticateUser, authorizeRoles("admin"), getUser); //get single user (Admin only route)

router
  .route("/updateUser/:id")
  .put(authenticateUser, authorizeRoles("admin"), updateUserRole); // update user roles (Admin only route)

router
  .route("/deleteUser/:id")
  .delete(authenticateUser, authorizeRoles("admin"), deleteUser); // delete user roles (Admin only route)

module.exports = router;
