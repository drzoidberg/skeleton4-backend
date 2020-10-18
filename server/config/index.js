const colors = require('colors')

const expressLoader = require('./express.config')
const mongooseLoader = require('./mongoose.config')

module.exports = (app) => {
  mongooseLoader()
  console.log('MongoDB Initialized'.yellow)
  expressLoader({ app })
  console.log('Express Initialized'.yellow)
}