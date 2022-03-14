const { join } = require('path');

const getSignup = ({ url }, res) => {
  if (url.includes('signup.html')) return res.redirect('/signup');

  return res.sendFile(join(__dirname, '..', '..', '..', 'public', 'pages', 'signup.html'));
};

module.exports = getSignup;
