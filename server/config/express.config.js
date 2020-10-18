const compress = require('compression')
const colors = require('colors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const Template = require('../../template')
const userRoutes = require('../routes/user.routes')
const middlewares = require('../middlewares')

module.exports = ({ app }) => {

    // parsing and encoding the body into json format
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // singificantly compress the response bodies
    app.use(compress())

    // securing app by setting various HTTP headers
    app.use(helmet())

    // // setting CORS manually
    app.use(middlewares.manualCors)

    // HTTP request logger. Brings extra info to each http request each time a request is performed
    app.use(morgan('dev'))

    // serving statically images
    app.use('/uploads/images', express.static(path.join('uploads', 'images')))

    // setting up routes
    app.use('/api/users', userRoutes)

    // serving a simple template when user try to access '/'
    app.get('/', (req, res, next) => {
        res
            .status(200)
            .send(Template())
    })

    // it triggers when no other error in the app has been triggered
    app.use(middlewares.notFound)
    app.use(middlewares.errorHandler)

    console.log('Express Initialized'.yellow);
    // must return the app if we use loaders
    return app
}