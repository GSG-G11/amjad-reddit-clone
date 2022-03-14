const { compare } = require('bcryptjs');
const { checkUser } = require('../../database/queries/validation');
const { loginSchema } = require('../../schemas');
const { customError } = require('../errors');
const { signToken } = require('../../jwt');

const postLogin = ({ body }, res, next) => {
  const { JWT_SECRET } = process.env;
  let id;

  loginSchema
    .validateAsync(body)

    .then(({ email }) => checkUser(email))

    .then(({ rowCount, rows }) => {
      if (!rowCount) customError({ status: 404, msg: 'The email you entered isn’t connected to an account. please Create one' });

      id = rows[0].id;
      const dbPass = rows[0].password;

      return dbPass;
    })

    .then((dbPass) => {
      const { password } = body;
      return compare(password, dbPass);
    })

    .then((isMatch) => !isMatch && customError({ status: 401, msg: 'The password you’ve entered is incorrect' }))

    .then(() => signToken({ id }, JWT_SECRET))

    .then((token) => res.cookie('token', token).json({ msg: 'successfully logged in' }))

    .catch(next);
};

module.exports = postLogin;
