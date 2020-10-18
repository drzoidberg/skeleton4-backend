const env = require('../config/env.config');

module.exports = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        error: err.message,
        stack: env.nodeEnv === 'production' ? null : err.stack,
    })
}
