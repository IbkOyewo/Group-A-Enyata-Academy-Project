const {logAdmin, userForm, adminCreateApplication, adminComposeAssessment, getAssessment} = require("../services")
const dotenv = require('dotenv')
const multer = require('multer')
const {
  createUser,
  validatePassword,
  getUser,
  updateToken,
  updatePassword,
} = require("../services");
const sendApplicationEmail =  require("../utils/mailler");
const sendVerificationEmail = require("../utils/mailler");
const { generate_oneTimeToken, hashPassword, generateAdminToken } = require("../utils/index");
const { verifyToken } = require("../middleware");
const { cloudinaryConfig } = require("../utils/helpers");
const {cloudinaryUpload, cloudinaryApplicationUpload, cloudinaryAssessmentUpload} = require("../middleware/fileUpload");
dotenv.config();

const createNewUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await createUser(body);
    const { password, ...user } = newUser;

    res
      .json({
        status: "success",
        message: `created successfully`,
        data: user,
      })
      .status(201);
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
      res.status(201).json({
        status: "success",
        message: "User is authenticated ",
        data: req.body,
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
      return res.json({
        status: "failed",
        message: "User does not exist",
      });
    }
    const oneTimeToken = generate_oneTimeToken();
    const verifyuserToken = await updateToken(req.body.email, oneTimeToken);
    sendVerificationEmail(req.body.email, oneTimeToken);
    return res
      .json({
        status: "success",
        message: "successfully sent reset password",
      })
      .status(201);
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
      return res.json({
        status: "success",
        message: "updated Verified user",
        data: Verified,
      });
    }

    res.json({
      status: "failed",
      message: "not Verified user",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const adminLog = async (req, res, next) => {
  try {
    const { body } = req;
    await logAdmin(body);
    const token = await generateAdminToken(body)

    res.status(200).json({
      status: "Success",
      message: "Admin login Successful",
      token: token
    });
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = req.body;

    await cloudinaryUpload(body)
    await userForm(body);
    await sendApplicationEmail(body);
    return res.status(201).json({
      message:
        `Application successfully received.`
    });
  } catch (error) {
    return next(error);
  }
};

const createNewApplication = async (req, res) => {
  try {
    const { body} = req;
    await cloudinaryApplicationUpload(body);
    await adminCreateApplication(req.body);
    

    return res.status(200).json({
      status: 'Success',
      message: 'Application advert sent successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const composeAssessment = async (req, res) => {
  try {
    const { body} = req;
    await cloudinaryAssessmentUpload(body)
    await adminComposeAssessment(req.body);
    return res.status(201).json({
      status: 'Success',
      message: 'Assessment Composed successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const takeAssessment = async (req, res) => {
  try {
    const { body} = req;
    const assessment = await getAssessment(body);
    return res.status(201).json({
      status: 'Success',
      message: 'Assessments Gotten successfully',
      data: assessment
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  createNewUser,
  loginUser,
  forgetpassword,
  resetPassword,
  adminLog,
  register,
  createNewApplication,
  composeAssessment,
  takeAssessment
};
