const express = require("express");
const router = express.Router();
const upload = require('../multer/index')
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
  returnSingleUser,
  returnSingleAdmin,
  uploadImage,
  getUserDetailsById,
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
const { cloudinaryUpload, cloudinaryAdminUpload } = require("../middleware/fileUpload");
const uploadFiles = require("../controller/upload");
const checkIfUserExists = require("../validation");

//ADMIN ENDPOINTS
router.post("/api/admin/register", validateUser(registerAdminSchema), createNewAdmin);
router.post("/api/admin/login", validateUser(loginAdminSchema), adminLog);
router.post("/api/admin/application", upload.uploadApplicationFile,cloudinaryAdminUpload, verifyToken('access'), createNewApplication)
router.post("/api/admin/compose-assessment", upload.uploadApplicationFile, cloudinaryAdminUpload,verifyToken('access'), composeAssessment)
router.get("/api/user/profile/:userid", verifyToken('access'), getUserDetailsById)
router.get("/api/user/details", verifyToken('access'), getUserDetails)
router.get("/api/user-dashboard/:userid",verifyToken('access'), returnSingleUser);
router.get("/api/admin-dashboard/:adminid",verifyToken('access'), returnSingleAdmin);
router.get("/api/user/results", verifyToken('access'), getUserResults)
router.get("/api/admin/profile", verifyToken('access'), getAdminDetails)
router.post(
  "/api/admin/register",
  upload.uploadApplicationFile,
  createNewAdmin
);
router.post(
  "/api/admin/upload",
  upload.uploadApplicationFile,
  cloudinaryAdminUpload,
  uploadImage
);
router.get("/api/admin/total_applications",
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
router.post("/api/user/application",upload.uploadUser,checkIfUserExists, cloudinaryUpload, register);
//router.post("/api/user/application", upload.uploadUser, cloudinaryUpload,checkIfUserExists, register);
router.get("/api/user/take-assessment",verifyToken('access'), takeAssessment)


module.exports = router;