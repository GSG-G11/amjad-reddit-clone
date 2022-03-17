const validRouter = require('express').Router();
const auth = require('../middlewares/auth');

const { handlePostLogin, handlePostSignUp, handleLogout } = require('../controllers/validation');

validRouter.route('/signup').post(handlePostSignUp);
validRouter.route('/login').post(handlePostLogin);
validRouter.route('/logout').get(handleLogout);

validRouter.get('/id', auth, ({ id }, res) => res.json(id));

module.exports = validRouter;
