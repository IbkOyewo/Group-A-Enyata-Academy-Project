const express = require("express");
const router = express.Router();
const { validateUser, checkUser, verifyToken } = require("../middleware");
const {
  createNewUser,
  loginUser,
  forgetpassword,
} = require("../controller/index");
const { createUserSchema, loginUserSchema } = require("../validator");

router.post(
  "/api/signup",
  validateUser(createUserSchema, "body"),
  checkUser("signup"),
  createNewUser
);

router.post("/api/login", validateUser(loginUserSchema, "body"), loginUser);

router.post("/forgetpassword", forgetpassword);

module.exports = router;
