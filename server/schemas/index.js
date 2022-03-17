const signUpSchema = require('./signup');
const loginSchema = require('./login');

const { postSchema, editPostSchema } = require('./post');

module.exports = { signUpSchema, loginSchema, postSchema, editPostSchema };
