const { join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');

const { handleNotFound, handleInternalError } = require('./controllers/errors');
const { validRouter, staticRouter } = require('./routers');

const app = express();

if (process.env.NODE_ENV === 'dev') {
  const morgan = require('morgan');

  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(staticRouter, validRouter);
app.use(express.static(join(__dirname, '..', 'public'))); // ! must be below static router
app.use(handleNotFound, handleInternalError);

module.exports = app;
