const { join } = require('path');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const favicon = require('serve-favicon');

const { handleNotFound, handleInternalError } = require('./controllers');

const staticRouter = express.static(join(__dirname, '..', 'public'));
const { validRouter } = require('./routers');

const app = express();

app.use(morgan('tiny'));

app.use('/', staticRouter);
app.use('/api/v1', validRouter);

app.use(favicon(join(__dirname, '..', 'favicon.ico')));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(handleNotFound, handleInternalError);

module.exports = app;
