const { handleNotFound, handleInternalError } = require('./errors');
const customError = require('./customError');

module.exports = { handleNotFound, handleInternalError, customError };
