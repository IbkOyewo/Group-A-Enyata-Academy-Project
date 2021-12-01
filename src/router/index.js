const express = require("express");
const router = express.Router();
const { validateUser, checkUser } = require("../middleware");
const {
  createNewUser,
  loginUser,
  forgetpassword,
  register,
  adminLog,
  createNewApplication,
  resetPassword,
} = require("../controller/index");
const { createUserSchema, loginUserSchema } = require("../validator");
const { validateAdmin } = require("../utils");
//ADMIN ENDPOINTS
router.post("/api/admin/login", validateAdmin, adminLog);
router.post("/api/admin/application", createNewApplication)
//APPLICANT ENDPOINTS
router.post("/api/signup", validateUser(createUserSchema, "body"), checkUser("signup"), createNewUser);
router.post("/api/login", validateUser(loginUserSchema, "body"), loginUser);
router.post("/forgetpassword", forgetpassword);
router.post("/user/forgetpassword", forgetpassword);
router.put("/user/reset-password", resetPassword);
router.post("/api/user/application", register);


module.exports = router;
