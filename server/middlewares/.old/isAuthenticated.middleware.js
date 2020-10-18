const expressJwt = require('express-jwt');

const config = require('../../config/config')

module.exports = expressJwt({
    algorithms: ['HS256'],
    // userProperty: 'auth',
    secret: config.jwtSecret
});
                                            /* if we wanted a different key for populating the authenticated user,
                                                other than 'user', we use the 'userProperty' property */