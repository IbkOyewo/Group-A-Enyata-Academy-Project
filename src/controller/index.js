const {
  createUser,
  validatePassword,
  getUser,
  updatePassword,
} = require("../services");
const sendVerificationEmail = require("../utils/mailler");
const { generate_oneTimeToken, hashPassword } = require("../utils/index");

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
        message: "User dose exist",
      });
    }
    const oneTimeToken = generate_oneTimeToken();
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
    console.log("======", encryptedPassword);
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

module.exports = { createNewUser, loginUser, forgetpassword, resetPassword };
