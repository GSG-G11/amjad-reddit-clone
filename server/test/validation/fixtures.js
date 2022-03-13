const validCredentials = {
  username: 'amjad',
  email: 'amjad@gmail.com',
  password: '12345678',
  confirmPassword: '12345678',
};

const inValidCredentials = {
  username: 'amjad',
  email: 'invalid email',
  password: '12345678',
  confirmPassword: '12345678',
};

module.exports = { validCredentials, inValidCredentials };
