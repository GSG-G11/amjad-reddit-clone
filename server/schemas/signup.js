const joi = require('joi');

const signUpSchema = joi.object({
  username: joi.string().min(3).max(100)
    .required(),

  email: joi.string().email().max(100)
    .required(),

  password: joi.string().min(8).max(50)
    .required(),

  confirmPassword: joi.ref('password'),
});

module.exports = signUpSchema;
