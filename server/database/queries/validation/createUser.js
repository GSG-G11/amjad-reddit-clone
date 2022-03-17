const connection = require('../../config/connection');

const rand = Math.floor(Math.random() * 10);
const avatar = `https://randomuser.me/api/portraits/lego/${rand}.jpg`;

const createUser = ({ username, email, hashedPass }) =>
  connection.query(
    'INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING id',
    [username, email, hashedPass, avatar],
  );

module.exports = createUser;
