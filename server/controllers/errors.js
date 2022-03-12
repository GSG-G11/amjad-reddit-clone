const { join } = require('path');

const handleNotFound = (req, res) => {
  res.status(404).sendFile(join(__dirname, '..', '..', 'public', 'pages', '404.html'));
};

const handleInternalError = (err, req, res, next) => {
  res.status(500).sendFile(join(__dirname, '..', '..', 'public', 'pages', '500.html'));
};

module.exports = { handleNotFound, handleInternalError };
