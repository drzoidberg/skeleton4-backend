const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

// login
const signin = async (req, res) => {
    try {
        // fetching user
        let user = await User.findOne({ "email": req.body.email });

        if (!user) {
            return res
                .status(401)
                .json({
                    error: 'User not found'
                });
        };

        // if email/password don't match
        if(!user.authenticate(req.body.password)) {
            return res
                .status(401)
                .json({
                    error: 'Email and password do not match'
                });
        };

        // setting & assigning token based on config (secret + userid)
        const token = jwt.sign(
            { _id: user._id },
            config.jwtSecret,
        );

        // setting 'token' cookie
        res.cookie('t', token, { expire: new Date() + (24 * 3600) });

        return res
            .json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                }
            });
    } catch (error) {
        return res
            .status(401)
            .json({
                error: 'Could not sign in'
            });
    };
};

// logout
const signout = (req, res) => {

    // removing cookie
    res.clearCookie('t')
    return res
        .status(200)
        .json({
            message: 'Signed out'
        });
};

// used for protecting routes that need authentication
/* it returns 'req.auth' key, containing:
    { _id: 'user id', iat: 'timestamp from the moment expressJwt was generated' }
*/
const hasAuthentication = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256']
});

// used for protecting routes that need authorization
const hasAuthorization = (req, res, next) => {
    const authorized =
        req.profile &&                                  // populated by userById in user.controller
        req.auth &&                                     // populated by hasAuthentication here, in auth.hasAuthentication. Proves that user has token
        req.profile._id == req.auth._id                 // the userid logged in & and the userid that has the current token match

    if(!(authorized)) {
        return res
            .status(403)
            .json({
                error: 'User is not authorized'
            });
    };
    next();
}

module.exports = {
    signin,
    signout,
    hasAuthentication,
    hasAuthorization,
};
