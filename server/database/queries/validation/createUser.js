const connection = require('../../config/connection');

const createUser = ({ username, email, hashedPass }) => connection
  .query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, hashedPass]);

module.exports = createUser;
