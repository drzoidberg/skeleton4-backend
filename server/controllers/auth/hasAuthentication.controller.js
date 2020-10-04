const expressJwt = require('express-jwt');
const config = require('../../../config/config');


// used for protecting routes that need authentication
/* it returns 'req.auth' key, containing:
    { _id: 'user id', iat: 'timestamp from the moment expressJwt was generated' }
*/
module.exports = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256']
});