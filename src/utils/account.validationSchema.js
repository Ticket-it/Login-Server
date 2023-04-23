// Important requires
const Joi = require("joi");

/**
 * Validation schema using Joi for register
 */
const accountValidSchemaRegister = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(8).max(15).required(),
  fullName: Joi.string().trim().required(),
  mobileNo: Joi.string().pattern(/^01\d{9}$/).required(),
});

/**
 * Validation schema using Joi for login
 */
const accountValidSchemaLogin = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),  
  password: Joi.string().min(8).max(15).required(),
});

module.exports = { accountValidSchemaRegister,accountValidSchemaLogin };
