const { getUser } = require("../services");
const jwt = require("jsonwebtoken");

const checkUser = (type) => async (req, res, next) => {
  try {
    const { email } = req.body;
    const [user] = await getUser(email);
    if (type === "signup") {
      if (user) {
        return res.json({
          status: "failed",
          message: "User already exist",
        });
      }
    } else {
      if (!user) {
        return res.json({
          status: "failed",
          message: "User dose not exist",
        });
      }
    }

    req.user = user;
    return next();
  } catch (error) {
    next(error.message);
  }
};

// verify token
const verifyToken = () => async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.queries.token;

    if (!token)
      return res.status(403).json({
        status: "fail",
        message: "No token provided.",
      });

    const tokenValidated = jwt.verify(token, process.env.RESET_TOKEN_KEY);
    if (!tokenValidated) {
      return res.status(403).json({
        status: "fail",
        message: "Failed to authenticate token.",
      });
    }

    req.token = tokenValidated;
    return next();
  } catch (err) {
    next(err);
  }
};

const validateUser = (data, type) => async (req, res, next) => {
  try {
    const getType = {
      body: req.body,
      params: req.params,
      queries: req.queries,
      headers: req.headers,
    };
    const options = {
      language: { key: "{{key}}" },
    };
    const result = getType[type];
    const isValid = await data.schema.validate(result, options);
    if (!isValid.error) {
      return next();
    }
    const { message } = isValid.error.details[0];
    return res.status(400).json({
      status: "fail",
      message: message.replace(/[\"]/gi, ""),
      errors: data.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyToken,
  validateUser,
  checkUser,
};
