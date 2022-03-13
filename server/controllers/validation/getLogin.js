const { join } = require('path');

const getLogin = (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', '..', 'public', 'pages', 'login.html'));
};

module.exports = getLogin;
