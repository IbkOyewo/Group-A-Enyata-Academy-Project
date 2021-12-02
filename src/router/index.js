const express = require("express");
const router = express.Router();
const { validateUser, checkUser, verifyToken } = require("../middleware");
const {
  createNewUser,
  loginUser,
  forgetpassword,
  register,
  adminLog,
  createNewApplication,
  resetPassword,
  composeAssessment,
  takeAssessment,
} = require("../controller/index");
const { createUserSchema, loginUserSchema, composeAssessmentSchema, setapplicationSchema, loginAdminSchema, userapplicationSchema } = require("../validator");

//ADMIN ENDPOINTS
router.post("/api/admin/login",validateUser(loginAdminSchema), adminLog);
router.post("/api/admin/application", validateUser(setapplicationSchema),verifyToken('admin'), createNewApplication)
router.post("/api/admin/compose-assessment", validateUser(composeAssessmentSchema), verifyToken('admin'), composeAssessment )
//APPLICANT ENDPOINTS
router.post("/api/signup", validateUser(createUserSchema, "body"), checkUser("signup"), createNewUser);
router.post("/api/login", validateUser(loginUserSchema, "body"), loginUser);
router.post("/forgetpassword", forgetpassword);
router.post("/user/forgetpassword", forgetpassword);
router.put("/user/reset-password", resetPassword);
router.post("/api/user/application", validateUser(userapplicationSchema), register);
router.get("/api/user/take-assessment", takeAssessment)

module.exports = router;
