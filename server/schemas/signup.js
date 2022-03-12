const joi = require('joi');

const signUpSchema = joi.object({
  name: joi.string().min(3).max(100).alphanum()
    .required(),

  email: joi.string().email().max(100)
    .regex(/example\.com$/)
    .required(),

  password: joi.string().password().min(8).max(50)
    .required(),

  confirmPassword: joi.ref('password'),
});

module.exports = signUpSchema;