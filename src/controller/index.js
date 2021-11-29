const { createUser, validatePassword, getUser } = require("../services");
const sendVerificationEmail = require("../utils/mailler");

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
    if (!userExisted) {
      return res.json({
        status: "failed",
        message: "User dose exist",
      });
    }
    const oneTimeToken = generate();
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

module.exports = { createNewUser, loginUser, forgetpassword };
