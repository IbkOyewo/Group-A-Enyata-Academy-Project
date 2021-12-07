const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAdminToken = async (user) => {
  const token = jwt.sign(
    {
      user_id: user.id,
      email: user.email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const validateAdminToken = async (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return false;
  }
};

//Encrypt user password
const hashPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

const comparePassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid;
};

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.TOKEN_KEY, {
    expiresIn: "1hr",
  });
  return token;
};

const generateResetToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.RESET_TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  generateAdminToken,
  validateAdminToken,
  generateResetToken,
};
