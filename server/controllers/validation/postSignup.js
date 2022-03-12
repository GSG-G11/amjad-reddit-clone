const signUpSchema = require('../../schemas/signup');

const postSignup = ({ body }, res) => {
  signUpSchema.validateAsync(body).then(({ email, password }) => {
    res.status(201).json({ msg: 'account created successfully' });
  })
    .catch((err) => res.status(404).json({ msg: err }));
};

module.exports = postSignup;
