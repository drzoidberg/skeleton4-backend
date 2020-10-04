const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');
const path = require('path');

const Template = require('../template');
const unauthorizedErrorMiddleware = require('./middlewares/unauthorizedError.middleware');
const manualCorsMiddleware = require('./middlewares/manualCors.middleware');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// parsing and encoding the body into json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// singificantly compress the response bodies
app.use(compress());

// securing app by setting various HTTP headers
app.use(helmet());

// setting CORS manually
app.use(manualCorsMiddleware);

// SETTING UP ROUTES
// serving statically images
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res, next) => {
    res
        .status(200)
        .send(Template());
});

// it triggers when no other error in the app has been triggered
app.use(unauthorizedErrorMiddleware);

module.exports = app;
