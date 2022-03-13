const { handleNotFound, handleInternalError } = require('./errors');
const handleGetSignUp = require('./validation/getSignup');
const handlePostSignUp = require('./validation/postSignup');
const handleGetLogin = require('./validation/getLogin');
const handlePostLogin = require('./validation/postLogin');

module.exports = {
  handleNotFound,
  handleInternalError,
  handleGetSignUp,
  handlePostSignUp,
  handleGetLogin,
  handlePostLogin,
};
