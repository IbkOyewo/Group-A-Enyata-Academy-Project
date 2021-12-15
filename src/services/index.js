const { any } = require("bluebird");
const db = require("../db");
const queries = require("../db/queries");
const { hashPassword, comparePassword, generateToken, generateAdminToken } = require("../utils");

// getting user
const getUser = (email) => db.any(queries.login, email);

const getUserFromApplication = (email) => db.any(queries.getUserFromApplication, email)
const createUser = async (body) => {
  const { firstName, lastName, email, phoneNumber, password } = body;
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
        email: userdata.email,
        fname: userdata.firstname,
        lname: userdata.lastname
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
      const token = generateAdminToken({
        id: data.id,
        email: data.email,
        name:data.name
      });
      return token;
    }
  }
  return false;
};
// to updata token
const updateToken = (email, token) =>
  db.any(queries.updateToken, [token, email]);

// update reset password
const updatePassword = (email, newPassword) => {
  db.any(queries.updatePassword, [newPassword, "", email]);
};

const createAdmin = async (body) => {
  const { name, email, password, phoneNumber, country, address, image } = body;
  const encryptedPassword = await hashPassword(password);
  const payload = [
    name,
    email,
    encryptedPassword,
    phoneNumber,
    country,
    address,
    image
  ];
  return db.one(queries.adminRegister, payload);
};

//const getAdmin = (email, password) => db.any(queries.adminLogin, [email, password])
const logAdmin = (email) => db.any(queries.adminLogin, email);

const insertFile = async(data) => {
  const payload = [data.cv, data.image]
  return db.any(queries.insertFiles,payload)
}
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
    data.image,
  ];
  return db.any(queries.userApplication, payload);
};

const adminImage = async (data) => {
  const payload = [
    data.image
  ];
  return db.any(queries.adminImages, payload);
};

const adminCreateApplication = async (data) => {
  const payload = [
    data.batchId,
    data.image,
    data.applicationLink,
    data.closureDate,
    data.instructions,
  ];
  return db.none(queries.setNewApplication, payload);
};

const adminComposeAssessment = async (data) => {
  const payload = [
    data.image,
    data.questions,
    data.optionA,
    data.optionB,
    data.optionC,
    data.optionD,
    data.answer
  ];
  return db.none(queries.composeAssessment, payload);
};

const submitAssessment = (data) => {
  const playload = [
    data.batch,
    data.dateComposed,
    data.NoofQuestions,
    data.timeAllocated,
    data.status,
  ];
  db.any(queries.submit_assessment, playload);
};

const assessmentHistory = () => db.any(queries.assessmentHistory);

const getAssessment = () => db.any(queries.getAssessment);

const getUserProfileById = (id) => db.oneOrNone(queries.getUserProfileById, [id]);

const getUserProfile = () => db.any(queries.getUserProfile);

const getSingleUserById = async (id) => db.oneOrNone(queries.getUserById, [id]);

const getSingleAdminById = async (id) => db.oneOrNone(queries.getAdminById, [id]);

const getAdminProfile = () => db.any(queries.getAdminProfile);

const getResults = () => db.any(queries.getResults);

const total_batchId = (batchId) => db.any(queries.total_batchId, [batchId]);

const total_application = () => db.any(queries.totalApplication);

const current_application = () => db.any(queries.current_application);

const batchEntries = () => db.any(queries.batchEntries);

const approveUser = (id, approvalStatus) => {
  db.any(queries.approveUser, [approvalStatus, id]);
};

const declineUser = (id, approvalStatus) => {
  db.any(queries.declineUser, [approvalStatus, id]);
};

const updateAdmin = (id, newName) => {
  db.any(queries.updateAdminById, [newName, id]);
};

module.exports = {
  createUser,
  validatePassword,
  getUser,
  updateToken,
  updatePassword,
  createAdmin,
  updateAdmin,
  insertFile,
  logAdmin,
  validateAdminPassword,
  adminImage,
  approveUser,
  userForm,
  adminCreateApplication,
  adminComposeAssessment,
  getAssessment,
  getUserProfile,
  getUserProfileById,
  getUserFromApplication,
  getSingleUserById,
  getSingleAdminById,
  getAdminProfile,
  getResults,
  current_application,
  total_application,
  total_batchId,
  batchEntries,
  submitAssessment,
  assessmentHistory,
  declineUser
};
