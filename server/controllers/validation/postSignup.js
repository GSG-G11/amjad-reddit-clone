const { hash } = require('bcryptjs');
const signUpSchema = require('../../schemas/signup');
const { checkUser, createUser } = require('../../database/queries');
const { signToken } = require('../../jwt');
const customError = require('../errors/customError');

const { JWT_SECRET } = process.env;

const postSignup = ({ body }, res, next) => {
  const { password, email, username } = body;

  signUpSchema
    .validateAsync(body)

    // * check if email already exists in db
    .then(() => checkUser(email))

    .then(({ rowCount }) => rowCount &&
    customError({ status: 409, msg: 'email already in use, try using a different one' }))

    .then(() => hash(password, 10))

    .then((hashedPass) => createUser({ username, email, hashedPass }))

    .then(({ rows }) => signToken(rows[0], JWT_SECRET))

    .then((token) => res.status(201).cookie('token', token).json({ msg: 'account created successfully' }))

    .catch(next);
};

module.exports = postSignup;
