const { join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const { handleNotFound, handleInternalError } = require('./controllers/errors');
const { validRouter, staticRouter, postsRouter, votesRouter } = require('./routers');

const app = express();

if (process.env.NODE_ENV === 'dev') {
  const morgan = require('morgan');

  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(staticRouter, validRouter);
app.use('/api/v1', postsRouter, votesRouter);
app.use(express.static(join(__dirname, '..', 'public'))); // ! must be below static router
app.use(handleNotFound, handleInternalError);

module.exports = app;
