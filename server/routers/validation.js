const validRouter = require('express').Router();

const { handlePostLogin, handlePostSignUp } = require('../controllers/validation');

validRouter.route('/signup').post(handlePostSignUp);
validRouter.route('/login').post(handlePostLogin);

module.exports = validRouter;
