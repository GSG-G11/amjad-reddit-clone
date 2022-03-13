const { compare } = require('bcryptjs');
const { checkUser } = require('../../database/queries');
const { loginSchema } = require('../../schemas');
const customError = require('../customError');
const { signToken } = require('../../jwt');

const { JWT_SECRET } = process.env;
let id; // reason => line 18

const postLogin = ({ body }, res, next) => {
  loginSchema
    .validateAsync(body)
    .then(({ email }) => checkUser(email))
    .then(({ rowCount, rows }) => {
      !rowCount &&
        customError({ status: 404, msg: 'The email you entered isn’t connected to an account. please Create one' });

      id = rows[0].id;
      const dbPass = rows[0].password;

      return { ...body, dbPass };
    })

    .then(({ password, dbPass }) => compare(password, dbPass))

    .then((isMatch) => !isMatch && customError({ status: 401, msg: 'The password you’ve entered is incorrect' }))

    .then(() => signToken({ id }, JWT_SECRET))

    .then((token) => res.status(302).cookie(token).json({ msg: 'successfully logged in' }))

    .catch(next);
};

module.exports = postLogin;
