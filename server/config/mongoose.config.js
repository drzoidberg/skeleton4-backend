const mongoose = require('mongoose')
const colors = require('colors')

const env = require('./env.config')

module.exports = async () => {
    try {
        /* configuring db connection */
        const conn = await mongoose.connect(env.mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Initialized: ${conn.connection.host}`.yellow)

        /* handling db connection error */
        mongoose.connection.on('error', () => {
            throw new Error(
                `Server error. Unable to connect to database: ${env.mongoUri}`
            )
        })

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}
