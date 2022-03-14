const validCredentials = {
  username: 'amjad2',
  email: 'amjad2@gmail.com',
  password: '12345678',
  confirmPassword: '12345678',
};

const inValidCredentials = {
  username: 'amjad',
  email: 'invalid email',
  password: '12345678',
  confirmPassword: '12345678',
};

const validDbCredentials = {
  username: 'amjad3',
  email: 'amjad3@gamilc.com',
  hashedPass: '#%$!%^$#$@',
};

module.exports = {
  validCredentials,
  inValidCredentials,
  validDbCredentials,
};
