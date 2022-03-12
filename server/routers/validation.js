const { join } = require('path');
const validRouter = require('express').Router();

validRouter.get('/signup', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'pages', 'signup.html'));
});

module.exports = validRouter;
