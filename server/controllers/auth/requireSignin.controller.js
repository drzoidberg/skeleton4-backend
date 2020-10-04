const expressJwt = require('express-jwt');

module.exports = expressJwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET
});