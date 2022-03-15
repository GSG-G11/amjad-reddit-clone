const { join } = require('path');

const getLogin = ({ id, url }, res) => {
  if (url.includes('login.html')) return res.redirect('/login');

  if (id) return res.status(303).redirect('/');

  return res.sendFile(join(__dirname, '..', '..', '..', 'public', 'pages', 'login.html'));
};

module.exports = getLogin;
