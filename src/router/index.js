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
router.post(
  "/api/admin/register",
  validateUser(registerAdminSchema),
  createNewAdmin
);
router.post(
  "/api/admin/login",
  validateUser(loginAdminSchema),
  validateAdmin,
  adminLog
);
router.post(
  "/api/admin/application",
  validateUser(setapplicationSchema),
  verifyToken("admin"),
  createNewApplication
);
router.post(
  "/api/admin/compose-assessment",
  validateUser(composeAssessmentSchema),
  verifyToken("admin"),
  composeAssessment
);
router.get("/api/user/profile", verifyToken("admin"), getUserDetails);
router.get("/api/user/results", verifyToken("admin"), getUserResults);
router.get("/api/admin/profile", verifyToken("admin"), getAdminDetails);

//ADMIN ENDPOINTS
router.post("/api/admin/login", validateUser(loginAdminSchema), adminLog);
router.post(
  "/api/admin/application",
  validateUser(setapplicationSchema),
  verifyToken("admin"),
  createNewApplication
);
router.post(
  "/api/admin/compose-assessment",
  validateUser(composeAssessmentSchema),
  verifyToken("admin"),
  composeAssessment
);
router.get(
  "/api/admin/total_applications",
  verifyToken("admin"),
  total_applications
);
router.get("/api/admin/total_batch", verifyToken("admin"), totalBatch);

router.get(
  "/api/admin/current_pplications",
  verifyToken("admin"),
  currentApplication
);

router.get("/api/admin/batch_entries", verifyToken("admin"), getEntries);

//APPLICANT ENDPOINTS
router.post(
  "/api/signup",
  validateUser(createUserSchema, "body"),
  checkUser("signup"),
  createNewUser
);
router.post("/api/login", validateUser(loginUserSchema, "body"), loginUser);
router.post("/forgetpassword", forgetpassword);
router.post("/user/forgetpassword", forgetpassword);
router.put("/user/reset-password", resetPassword);
router.post(
  "/api/user/application",
  validateUser(userapplicationSchema),
  register
);
router.get("/api/user/take-assessment", takeAssessment);

module.exports = router;
