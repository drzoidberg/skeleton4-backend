const express = require('express')
const colors = require('colors')

const config = require('./config/env.config')
const loaders = require('./config')

startServer = () => {

    /* loads the config loaders */
    const app = express()
    loaders(app)

    /* launches the server */
    app.listen(config.projectPort, (error) => {
        if (error) {
            console.log(`Server error. Trying to listen to port ${config.projectPort}: ${error}`.red.bold)
        }
        console.info(`Server started on port ${config.projectPort}`.yellow.bold)
    })
}

startServer()