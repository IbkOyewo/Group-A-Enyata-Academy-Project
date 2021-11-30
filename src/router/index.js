const express = require("express");
const router = express.Router();
const { validateUser, checkUser, verifyToken } = require("../middleware");
const {
  createNewUser,
  loginUser,
  forgetpassword,
  register,
  adminLog,
} = require("../controller/index");
const { createUserSchema, loginUserSchema } = require("../validator");
const { validateAdmin } = require("../utils");

router.post(
  "/api/signup",
  validateUser(createUserSchema, "body"),
  checkUser("signup"),
  createNewUser
);

router.post("/api/login", validateUser(loginUserSchema, "body"), loginUser);

router.post("/forgetpassword", forgetpassword);

router.post("/api/admin/login", validateAdmin, adminLog)
router.post("/api/user/application", register)
module.exports = router;
