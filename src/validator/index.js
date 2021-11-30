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

module.exports = { createUserSchema, loginUserSchema };
