const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const config = require('../../../config/config');

// login
module.exports = async (req, res) => {
    try {
        // fetching user
        let user = await User.findOne({ "email": req.body.email });

        if (!user) {
            return res
                .status(401)
                .json({
                    error: `User not found`
                });
        };

        // if email/password don't match
        if(!user.authenticate(req.body.password)) {
            return res
                .status(401)
                .json({
                    error: `Email and password don't match`
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
                error: `Couldn't sign in`
            });
    };
};