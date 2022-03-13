const validRouter = require('express').Router();
const {
  handleGetSignUp,
  handlePostSignUp,
  handleGetLogin,
  handlePostLogin,
} = require('../controllers');

validRouter.route('/signup').get(handleGetSignUp).post(handlePostSignUp);
validRouter.route('/login').get(handleGetLogin).post(handlePostLogin);

module.exports = validRouter;
