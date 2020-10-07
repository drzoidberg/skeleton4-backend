const bodyParser = require('body-parser');
const compress = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const Template = require('../../template');
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const { manualCorsMiddleware, unauthorizedErrorMiddleware } = require('../middlewares');

module.exports = ({ app }) => {

    // parsing and encoding the body into json format
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // singificantly compress the response bodies
    app.use(compress());

    // securing app by setting various HTTP headers
    app.use(helmet());

    // setting CORS manually
    app.use(manualCorsMiddleware);

    // HTTP request logger. Brings extra info to each http request each time a request is performed
    app.use(morgan('dev'));
// setting CORS manually

    // serving statically images
    app.use('/uploads/images', express.static(path.join('uploads', 'images')));

    // setting up routes
    app.use('/api', userRoutes);
    app.use('/api', authRoutes);

    // serving a simple template when user try to access '/'
    app.get('/', (req, res, next) => {
        res
            .status(200)
            .send(Template());
    });

    // it triggers when no other error in the app has been triggered
    app.use(unauthorizedErrorMiddleware);

    // must return the app if we use loaders
    return app;
}