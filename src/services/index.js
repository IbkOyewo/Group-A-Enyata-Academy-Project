const db = require('../db')
const queries = require('../db/queries')

const { hashPassword, comparePassword, generateToken } = require("../utils");

// getting user
const getUser = (email) => db.any(queries.login, email);

const createUser = async (body) => {
  const { firstName, lastName, email, phoneNumber, password } = body;
  const encryptedPassword = await hashPassword(password);
  const payload = [firstName, lastName, email, phoneNumber, encryptedPassword];
  return db.one(queries.addUser, payload);
};

const validatePassword = async (email, password) => {
  const user = await getUser(email);

  if (user.length === 1) {
    const isValid = await comparePassword(password, user[0].password);
    const userdata = user[0];
    console.log(userdata);
    if (isValid) {
      const token = generateToken({
        id: userdata.id,
      });
      return token;
    }
  }
  return false;
};

const logAdmin = async (data) => {
    const payload = [data.email, data.password]
    return db.any(queries.adminLogin, payload)
}

const userForm= async (data) => {
    const payload = [data.fname, data.lname, data.email, data.cpga, data.address, data.course, data.university, data.dob]
    return db.any(queries.userApplication, payload)
}

const adminCreateApplication = async (data) => {
  const payload = [data.batchId, data.imageUrl, data.applicationLink, data.closureDate, data.instructions]
  return db.none(queries.setNewApplication,payload);
};

const adminComposeAssessment = async (data) => {
  const payload = [data.imageUrl, data.questions, data.optionA, data.optionB, data.optionC, data.optionD]
  return db.none(queries.composeAssessment,payload);
};

module.exports = {
  createUser,
  validatePassword,
  getUser,
  logAdmin,
  userForm,
  adminCreateApplication,
  adminComposeAssessment
};
