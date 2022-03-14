const customError = ({ msg, status }) => {
  const error = new Error(msg);

  error.status = status;

  throw error;
};

module.exports = customError;
