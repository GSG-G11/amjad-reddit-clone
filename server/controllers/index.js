const { handleNotFound, handleInternalError } = require('./errors');
const handleGetSignUp = require('./validation/getSignup');
const handlePostSignUp = require('./validation/postSignup');

module.exports = {
  handleNotFound,
  handleInternalError,
  handleGetSignUp,
  handlePostSignUp,
};
