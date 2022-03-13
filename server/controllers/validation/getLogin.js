const { join } = require('path');

const getLogin = ({ id }, res) => {
  if (id) return res.status(303).send({ msg: 'you are already authenticated, redirecting...' });

  res.status(200).sendFile(join(__dirname, '..', '..', '..', 'public', 'pages', 'login.html'));
};

module.exports = getLogin;
