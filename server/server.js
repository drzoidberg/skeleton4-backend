const express = require('express')
const colors = require('colors')

const env = require('./config/env.config')
const config = require('./config')

startServer = () => {

    /* loads the rest of the configs */
    const app = express()
    config(app)

    /* launches the server */
    app.listen(env.projectPort, (error) => {
        if (error) {
            console.log(`Server error. Trying to listen to port ${env.projectPort}: ${error}`.red.bold)
        }
        console.info(`Server started on port ${env.projectPort}`.yellow)
    })
}

startServer()