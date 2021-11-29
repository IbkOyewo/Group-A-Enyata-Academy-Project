const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  const token = jwt.sign(user, process.env.RESET_TOKEN_KEY, {
    expiresIn: "24h",
  });
  return token;
};

// const generateResetToken = (user) => {
//   const token = jwt.sign(
//     { id: user.id, email: user.email },
//     process.env.RESET_TOKEN_KEY,
//     {
//       expiresIn: "1h",
//     }
//   );
//   return token;
// };

const generate_oneTimeToken = () => Math.floor(100000 + Math.random() * 900000);

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  generate_oneTimeToken,
};
