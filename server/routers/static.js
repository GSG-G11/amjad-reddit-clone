const staticRouter = require('express').Router();

const { handleGetLogin, handleGetSignUp } = require('../controllers/static');
const auth = require('../middlewares/auth');

staticRouter.get(['/signup', '/pages/signup.html'], handleGetSignUp);
staticRouter.get(['/login', '/pages/login.html'], auth, handleGetLogin);

module.exports = staticRouter;
