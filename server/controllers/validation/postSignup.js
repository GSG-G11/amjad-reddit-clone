const signUpSchema = require('../../schemas/signup');

const postSignup = ({ body }, res) => {
  signUpSchema.validateAsync(body).then(({ email, password }) => {
    res.status(201).json({ msg: 'account created successfully' });
  })
    .catch(() => res.status(400).json({ msg: 'bad request' }));
};

module.exports = postSignup;
