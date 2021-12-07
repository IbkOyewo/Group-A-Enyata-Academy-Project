const express = require("express");
const router = express.Router();
const {
  validateUser,
  checkUser,
  verifyToken
} = require("../middleware");
const {
  createNewUser,
  loginUser,
  forgetpassword,
  register,
  createNewApplication,
  resetPassword,
  composeAssessment,
  takeAssessment,
  getUserDetails,
  createNewAdmin,
  adminLog,
  getUserResults,
  getAdminDetails,
} = require("../controller/index");
const {
  createUserSchema,
  loginUserSchema,
  composeAssessmentSchema,
  setapplicationSchema,
  loginAdminSchema,
  userapplicationSchema,
  registerAdminSchema
} = require("../validator");
const {
  validateAdmin
} = require("../utils");

//ADMIN ENDPOINTS
router.post("/api/admin/register", validateUser(registerAdminSchema), createNewAdmin);
router.post("/api/admin/login", validateUser(loginAdminSchema), adminLog);
router.post("/api/admin/application", validateUser(setapplicationSchema), verifyToken('access'), createNewApplication)
router.post("/api/admin/compose-assessment", validateUser(composeAssessmentSchema), verifyToken('access'), composeAssessment)
router.get("/api/user/profile", verifyToken('access'), getUserDetails)
router.get("/api/user/results", verifyToken('access'), getUserResults)
router.get("/api/admin/profile", verifyToken('access'), getAdminDetails)
//APPLICANT ENDPOINTS
router.post("/api/signup", validateUser(createUserSchema, "body"), checkUser("signup"), createNewUser);
router.post("/api/login", validateUser(loginUserSchema, "body"), loginUser);
router.post("/forgetpassword", forgetpassword);
router.post("/user/forgetpassword" ,verifyToken('access'), forgetpassword);
router.put("/user/reset-password",verifyToken('access'), resetPassword);
router.post("/api/user/application", validateUser(userapplicationSchema),verifyToken('access'),register);
router.get("/api/user/take-assessment",verifyToken('access'), takeAssessment)


module.exports = router;