const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().max(100).required(),

  password: joi.string().min(8).max(50).required(),
});

module.exports = loginSchema;
