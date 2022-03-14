const { join } = require('path');

const handleNotFound = (req, res) => {
  res.status(404).sendFile(join(__dirname, '..', '..', '..', 'public', 'pages', '404.html'));
};

const handleInternalError = (err, req, res, next) => {
  // * my errors
  if (err.status) return res.status(err.status).json({ msg: err.message });

  // * unexpected errors
  if (err.details) return res.status(400).json({ msg: 'bad request' });

  return res.status(500).sendFile(join(__dirname, '..', '..', '..', 'public', 'pages', '500.html'));
};

module.exports = { handleNotFound, handleInternalError };
