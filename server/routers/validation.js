const validRouter = require('express').Router();

const { handlePostLogin, handlePostSignUp, handleLogout } = require('../controllers/validation');

validRouter.route('/signup').post(handlePostSignUp);
validRouter.route('/login').post(handlePostLogin);
validRouter.route('/logout').get(handleLogout);

module.exports = validRouter;
