const { join } = require('path');

const getSignup = (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'pages', 'signup.html'));
};

module.exports = getSignup;
