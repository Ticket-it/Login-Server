const Joi = require("joi");

const accountValidSchemaRegister = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(8).max(15).required(),
  fullName: Joi.string().trim().required(),
  birthDate: Joi.string().pattern(/^([1-9]|[12][0-9]|3[01])-([1-9]|1[0-2])-\d{4}$/).required(),
  gender: Joi.string().trim().required(),
  mobileNo: Joi.string().pattern(/^01\d{9}$/).required(),
});

const accountValidSchemaLogin = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),  
  password: Joi.string().min(8).max(15).required(),
});

module.exports = { accountValidSchemaRegister,accountValidSchemaLogin };
