const connection = require('../config/connection');

const checkUser = (email) =>
  connection.query('SELECT email, password, id FROM users WHERE email = $1', [email]);

module.exports = checkUser;
