const expressLoader = require('./express.loader');
const mongooseLoader = require('./mongoose.loader');

module.exports = (app) => {
  mongooseLoader();
  console.log('MongoDB Initialized');
  expressLoader({ app });
  console.log('Express Initialized');
}