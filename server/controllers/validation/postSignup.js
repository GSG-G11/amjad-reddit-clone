const { hash } = require('bcryptjs');
const signUpSchema = require('../../schemas/signup');
const { checkUser, createUser } = require('../../database/queries');
const { signToken } = require('../../jwt');
const customError = require('../customError');

const { JWT_SECRET } = process.env;

const postSignup = ({ body }, res, next) => {
  signUpSchema.validateAsync(body)
  // * check if email already exists in db
    .then(({ username, email, password }) => checkUser(email).then(({ rowCount }) => {
      if (rowCount) return customError({ status: 409, msg: 'email already in use, try using a different one' });

      return hash(password, 10)
        .then((hashedPass) => {
          createUser({ username, email, hashedPass })
            .then(({ rows }) => signToken(rows.at(0).id, JWT_SECRET))
            .then((token) => res.status(201).cookie('token', token).json({ msg: 'account created successfully' }))
            .catch((next)); // * catch token error
        })
        .catch(next); //* catch hash error
    }))
    .catch(next);
};

module.exports = postSignup;
