const {
  userForm,
  adminCreateApplication,
  adminComposeAssessment,
  getAssessment,
  getUserProfile,
  createAdmin,
  validateAdminPassword,
  getResults,
  getAdminProfile,
  submitAssessment,
  assessmentHistory,
  getSingleUserById,
  insertFile,
  getSingleAdminById,
  adminImage,
  getUserProfileById,
} = require("../services");
const dotenv = require("dotenv");
const {
  createUser,
  validatePassword,
  getUser,
  updateToken,
  updatePassword,
  current_application,
  total_application,
  total_batchId,
  batchEntries,
} = require("../services");
const sendApplicationEmail = require('../utils/applicationMailer')
const sendVerificationEmail = require("../utils/mailler");
const {
  generateResetToken,
  hashPassword,
  generateAdminToken,
} = require("../utils/index");
const {
  cloudinaryUpload,
  cloudinaryApplicationUpload,
  cloudinaryAssessmentUpload,
} = require("../middleware/fileUpload");
dotenv.config();

const createNewUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await createUser(body);
    const { password, ...user } = newUser;

    res.status(201).json({
        status: "success",
        message: `created successfully`,
        data: user,
      });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const token = await validatePassword(email, password);

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "User is authenticated ",
        //data: req.body,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};


const forgetpassword = async (req, res) => {
  try {
    const userExisted = await getUser(req.body.email);
    if (userExisted.length === 0) {
      return res.status(401).json({
        status: "failed",
        message: "User does not exist",
      });
    }

    const oneTimeToken = generateResetToken(userExisted[0]);
    const verifyuserToken = await updateToken(req.body.email, oneTimeToken);
    sendVerificationEmail(req.body.email, oneTimeToken);
    return res.status(200).json({
        status: "success",
        message: "successfully sent reset password",
      })
  } catch (error) {
    console.log(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { verification } = req.query;
    const user = await getUser(email);
    const encryptedPassword = await hashPassword(password);
    if (user[0].onetime_token === verification) {
      const Verified = updatePassword(email, encryptedPassword);
      return res.status(200).json({
        status: "success",
        message: "updated Verified user",
        data: Verified,
      });
    }

    res.status(401).json({
      status: "failed",
      message: "Not Verified user",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const createNewAdmin = async (req, res, next) => {
  try {
    const { body } = req;
    const newAdmin = await createAdmin(req.body);
    const { password, ...user } = newAdmin;

    res.status(201).json({
      status: "success",
      message: `Admin created successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const adminLog = async (req, res, next) => {
  try {
    const {
      password,
      email
    } = req.body;
    const token = await validateAdminPassword(email, password);

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Authenticated ",
        data: token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = req.body;

    await userForm(req.body);
    await sendApplicationEmail(body);
    return res.status(201).json({
      status: "success",
      message: `Application successfully received.`,
    });
  } catch (error) {
    return next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    const file = req.file
    //console.log(file);
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    await adminImage(req.body)
     res.status(201).json({
      status: "success",
      message: `File uploaded.`,
    });
    
  }catch(err){
    console.log(err);
  }
};


const createNewApplication = async (req, res) => {
  try {
    const { body } = req;
    //await cloudinaryApplicationUpload(body);
    await adminCreateApplication(req.body);

    return res.status(200).json({
      status: "Success",
      message: "Application advert sent successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "Unable to send application advert",
    });
  }
};

const composeAssessment = async (req, res) => {
  try {
    const { body } = req;
    //await cloudinaryAssessmentUpload(body);
    await adminComposeAssessment(body);
    return res.status(201).json({
      status: "Success",
      message: "Assessment Composed successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "Unable to compose Assessment",
    });
  }
};

const takeAssessment = async (req, res) => {
  try {
    const { body } = req;
    const assessment = await getAssessment(body);
    return res.status(201).json({
      status: "Success",
      message: "Assessments Gotten successfully",
      data: assessment,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "Unable to fetch Assessment",
    });
  }
};

const getUserDetailsById = async (req, res) => {
  try {
    //const { body } = req;
    const user = await getUserProfileById(req.params.userid);
    return res.status(200).json({
      status: "Success",
      message: "User Gotten successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "User not found ",
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    //const { body } = req;
    const user = await getUserProfile();
    console.log(user);
    return res.status(200).json({
      status: "Success",
      message: "Users Gotten successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "User not gotten ",
    });
  }
};

const returnSingleUser = async (req, res) => {
  try {
    const currentUser = await getSingleUserById(req.params.userid);
  
    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: currentUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "Unable to fetch user",
    });
  }
};

const returnSingleAdmin = async (req, res) => {
  try {
    const currentAdmin = await getSingleAdminById(req.params.adminid);
  
    res.status(200).json({
      status: 'Success',
      message: 'Admin fetched successfully',
      data: currentAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "This Admin does not exist",
    });
  }
};


const getUserResults = async (req, res) => {
  try {
    const { body } = req;
    const user = await getResults(body);

    return res.status(200).json({
      status: "Success",
      message: "Results Gotten successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "Unable to get results",
    });
  }
};

const getAdminDetails = async (req, res) => {
  try {
    const { body } = req;
    const admin = await getAdminProfile(body);
    const {
      id,
      password,
      ...getAdmin
    } = admin[0]

    return res.status(200).json({
      status: "Success",
      message: "Admin Gotten successfully",
      data: getAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: "Unable to fetch Admin",
    });
  }
};

const totalBatch = async (req, res) => {
  try {
    const { batchId } = req.body;

    const data = await total_batchId(batchId);
    if (data.length === 0) {
      res
        .json({
          status: "Success",
          message: "No applicant",
        })
        .status(200);
    } else {
      res
        .json({
          status: "Success",
          message: "total batch",
          data: data.length,
        })
        .status(201);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const total_applications = async (req, res) => {
  try {
    console.log(req);
    const data = await total_application(req.body);
    console.log(data);
    if (data.length === 0) {
      res.json({
        status: "Success",
        message: "No applicant",
      });
    } else {
      res
        .json({
          status: "Success",
          message: "total number of applications",
          data,
        })
        .status(201);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const currentApplication = async (req, res) => {
  try {
    const data = await current_application(req.body);
    if (data.length === 0) {
      res.json({
        status: "Success",
        message: "No application yet",
      });
    } else {
      res
        .json({
          status: "Success",
          message: "current application",
          data: data.length,
        })
        .status(201);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getEntries = async (req, res) => {
  try {
    const data = await batchEntries(req.body);
    if (data.length === 0) {
      res.json({
        status: "Success",
        message: "No entries yet",
      });
    } else {
      res
        .json({
          status: "Success",
          message: "current batch entries",
          data,
        })
        .status(201);
    }
  } catch (error) {
    return console.log(error.message);
  }
};

const submittedAssessment = async (req, res, next) => {
  try {
    const data = await submitAssessment(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully submitted assessment",
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const getassessmentHistory = async (req, res) => {
  try {
    const data = await assessmentHistory(req.body);
    if (data.length === 0) {
      res.json({
        status: "Success",
        message: "No assessment yet",
      });
    } else {
      res
        .json({
          status: "Success",
          message: "all assessment history",
          data,
        })
        .status(201);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createNewUser,
  loginUser,
  forgetpassword,
  resetPassword,
  createNewAdmin,
  adminLog,
  register,
  createNewApplication,
  composeAssessment,
  takeAssessment,
  getUserDetails,
  returnSingleUser,
  returnSingleAdmin,
  getUserResults,
  getAdminDetails,
  getUserDetailsById,
  uploadImage,
  currentApplication,
  total_applications,
  submittedAssessment,
  getassessmentHistory,
  totalBatch,
  getEntries,
};