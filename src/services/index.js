const db = require("../db");
const queries = require("../db/queries");
const {
  hashPassword,
  comparePassword,
  generateToken
} = require("../utils");

// getting user
const getUser = (email) => db.any(queries.login, email);

const createUser = async (body) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password
  } = body;
  const encryptedPassword = await hashPassword(password);
  const payload = [
    firstName,
    lastName,
    email,
    phoneNumber,
    encryptedPassword,
    "",
  ];
  return db.one(queries.addUser, payload);
};

const validatePassword = async (email, password) => {
  const user = await getUser(email);

  if (user.length === 1) {
    const isValid = await comparePassword(password, user[0].password);
    const userdata = user[0];
    if (isValid) {
      const token = generateToken({
        id: userdata.id,
      });
      return token;
    }
  }
  return false;
};

const validateAdminPassword = async (email, password) => {
  const admin = await logAdmin(email);

  if (admin.length === 1) {
    const isValid = await comparePassword(password, admin[0].password);
    const data = admin[0];
    if (isValid) {
      const token = generateToken({
        id: data.id,
        email: data.email
      });
      return token;
    }
  }
  return false;
};
// to updata token
const updateToken = (email, token) => db.any(queries.updateToken, [token, email])

// update reset password
const updatePassword = (email, newPassword) => {
  db.any(queries.updatePassword, [newPassword, "", email]);
};

const createAdmin = async (body) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    country,
    address
  } = body;
  const encryptedPassword = await hashPassword(password);
  const payload = [name, email, encryptedPassword, phoneNumber, country, address];
  return db.one(queries.adminRegister, payload);
};

//const getAdmin = (email, password) => db.any(queries.adminLogin, [email, password])
const logAdmin = (email) => db.any(queries.adminLogin, email);

const userForm = async (data) => {
  const payload = [
    data.fname,
    data.lname,
    data.email,
    data.cgpa,
    data.address,
    data.course,
    data.university,
    data.dob,
    data.cv,
    data.image
  ];
  return db.any(queries.userApplication, payload);
};

const adminCreateApplication = async (data) => {
  const payload = [data.batchId, data.imageUrl, data.applicationLink, data.closureDate, data.instructions]
  return db.none(queries.setNewApplication, payload);
};

const adminComposeAssessment = async (data) => {
  const payload = [data.imageUrl, data.questions, data.optionA, data.optionB, data.optionC, data.optionD]
  return db.none(queries.composeAssessment, payload);
};

const getAssessment = () => db.any(queries.getAssessment);

const getUserProfile = () => db.any(queries.getUserProfile);

const getAdminProfile = () => db.any(queries.getAdminProfile);

const getResults = () => db.any(queries.getResults);
module.exports = {
  createUser,
  validatePassword,
  getUser,
  updateToken,
  updatePassword,
  createAdmin,
  logAdmin,
  validateAdminPassword,
  userForm,
  adminCreateApplication,
  adminComposeAssessment,
  getAssessment,
  getUserProfile,
  getAdminProfile,
  getResults
};