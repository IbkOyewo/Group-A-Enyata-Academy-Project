const Joi = require("joi");

const createUserSchema = {
  schema: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    phoneNumber: Joi.number(),
    password: Joi.string(),
  }),
  message: "Error creating user",
};

const loginUserSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const registerAdminSchema = {
  schema: Joi.object().keys({
    name: Joi.string().required,
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required,
    country: Joi.string().required,
    address: Joi.string().required,
  }),
};

const loginAdminSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const userapplicationSchema = {
  schema: Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email().required(),
    cgpa: Joi.number().required(),
    address: Joi.string().required(),
    course: Joi.string().required(),
    university: Joi.string().required(),
    dob: Joi.date().required(),
    cv: Joi.string(),
    image: Joi.string()
  }),
};

const setapplicationSchema = {
  schema: Joi.object().keys({
    batchId: Joi.string().required(),
    imageUrl: Joi.string(),
    applicationLink: Joi.string().email().required(),
    closureDate: Joi.date().required(),
    instructions: Joi.string().required(),
  }),
};

const composeAssessmentSchema = {
  schema: Joi.object().keys({
    imageUrl: Joi.string().required,
    questions: Joi.string().required(),
    optionA: Joi.string().required(),
    optionB: Joi.string().required(),
    optionC: Joi.string().required(),
    optionD: Joi.string().required(),
  }),
};


module.exports = {
  createUserSchema,
  loginUserSchema,
  registerAdminSchema,
  loginAdminSchema,
  userapplicationSchema,
  setapplicationSchema,
  composeAssessmentSchema
};