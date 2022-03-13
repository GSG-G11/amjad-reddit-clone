const validRouter = require('express').Router();
const {
  handleGetSignUp, handlePostSignUp, handleGetLogin, handlePostLogin,
} = require('../controllers');
const auth = require('../middlewares/auth');

validRouter.route('/signup').get(handleGetSignUp).post(handlePostSignUp);
validRouter.route('/login').get(auth, handleGetLogin).post(handlePostLogin);

module.exports = validRouter;
