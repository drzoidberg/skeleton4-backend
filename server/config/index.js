const colors = require('colors')

const expressConfig = require('./express.config')
const mongooseConfig = require('./mongoose.config')

module.exports = (app) => {
  mongooseConfig()
  expressConfig({ app })
}