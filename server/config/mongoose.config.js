const mongoose = require('mongoose')

const config = require('./env.config')

module.exports = () => {
    /* configuring db connection */
    mongoose.connect(config.mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })

    /* handling db connection error */
    mongoose.connection.on('error', () => {
        throw new Error(
            `Server error. Unable to connect to database: ${config.mongoUri}`
        )
    })
}
