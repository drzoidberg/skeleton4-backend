const colors = require('colors')

const expressLoader = require('./express.config')
const mongooseLoader = require('./mongoose.config')

module.exports = (app) => {
  mongooseLoader()
  expressLoader({ app })
}