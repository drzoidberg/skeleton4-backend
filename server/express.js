const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');

const errorHandlerMiddleware = require('./middlewares/errorHandler.middleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());


app.use(errorHandlerMiddleware)

module.exports = app;
