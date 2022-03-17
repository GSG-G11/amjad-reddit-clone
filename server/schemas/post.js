const joi = require('joi');

const postSchema = joi.object({
  content: joi.string().min(1).required(),
  date: joi.number().required(),
  img: joi.string(),
});

const editPostSchema = joi.object({
  content: joi.string().min(3).required(),
  img: joi.string(),
});
module.exports = { postSchema, editPostSchema };
