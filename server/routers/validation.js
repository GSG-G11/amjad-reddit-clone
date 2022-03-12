const validRouter = require('express').Router();
const { handleGetSignUp, handlePostSignUp } = require('../controllers');

validRouter.route('/signup').get(handleGetSignUp).post(handlePostSignUp);

module.exports = validRouter;
