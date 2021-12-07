const express = require("express");
const router = express.Router();
const { validateUser, checkUser, verifyToken } = require("../middleware");
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
  currentApplication,
  total_applications,
  totalBatch,
  getEntries,
  submittedAssessment,
  getassessmentHistory,
} = require("../controller/index");
const {
  createUserSchema,
  loginUserSchema,
  composeAssessmentSchema,
  setapplicationSchema,
  loginAdminSchema,
  userapplicationSchema,
  registerAdminSchema,
} = require("../validator");
const { validateAdmin } = require("../utils");

//ADMIN ENDPOINTS
router.post("/api/admin/register", validateUser(registerAdminSchema), createNewAdmin);
router.post("/api/admin/login", validateUser(loginAdminSchema), adminLog);
router.post("/api/admin/application", validateUser(setapplicationSchema), verifyToken('access'), createNewApplication)
router.post("/api/admin/compose-assessment", validateUser(composeAssessmentSchema), verifyToken('access'), composeAssessment)
router.get("/api/user/profile", verifyToken('access'), getUserDetails)
router.get("/api/user/results", verifyToken('access'), getUserResults)
router.get("/api/admin/profile", verifyToken('access'), getAdminDetails)
router.post(
  "/api/admin/register",
  validateUser(registerAdminSchema),
  createNewAdmin
);

router.get(
  "/api/admin/total_applications",
  verifyToken("access"),
  total_applications
);
router.get("/api/admin/total_batch", verifyToken("access"), totalBatch);

router.get(
  "/api/admin/current_applications",
  verifyToken("admin"),
  currentApplication
);

router.get("/api/admin/batch_entries", verifyToken("access"), getEntries);

router.get(
  "/api/admin/assessment_history",
  verifyToken("access"),
  getassessmentHistory
);

router.post("/api/admin/submit_assessment", submittedAssessment);

//APPLICANT ENDPOINTS
router.post(
  "/api/signup",
  validateUser(createUserSchema, "body"),
  checkUser("signup"),
  createNewUser
);
router.post("/api/login", validateUser(loginUserSchema, "body"), loginUser);
router.post("/forgetpassword", forgetpassword);
router.post("/user/forgetpassword" ,verifyToken('access'), forgetpassword);
router.put("/user/reset-password",verifyToken('access'), resetPassword);
router.post("/api/user/application", validateUser(userapplicationSchema),verifyToken('access'),register);
router.get("/api/user/take-assessment",verifyToken('access'), takeAssessment)


module.exports = router;