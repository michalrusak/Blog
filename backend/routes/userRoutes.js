const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getUser,
  deleteUser,
} = require("../controller/userController.js");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").delete(logout);

router.route("/user").get(getUser).delete(deleteUser);

module.exports = router;
