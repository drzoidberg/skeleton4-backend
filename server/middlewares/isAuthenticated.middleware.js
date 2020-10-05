const expressJwt = require('express-jwt');

const config = require('../../config/config')

module.exports = expressJwt({
    algorithms: ['HS256'],
    secret: config.jwtSecret
});