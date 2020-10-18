const config = require('../config/env.config');

module.exports = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: config.nodeEnv === 'production' ? null : err.stack,
    })
}
