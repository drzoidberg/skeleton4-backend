const jwt = require('jsonwebtoken');

const config = require('../../../config/config');
const User = require('../../models/user.model');

module.exports = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        /* check if user exists */
        if(err || !user) {
            return res
            .status(400)
                .json({
                    signinError: `There's no user with that email. Please sign up`
                });
        }
        /* authenticate */
        if(!user.authenticate(password)) {
            return res
            .status(401)                                        /* 401 Unauthorized: the request has not been applied because
                                                                    it lacks valid authentication credentials for the target resource. */
                .json({
                    signinError: `Email and password don't match`
                });
        }
        /* generate token & send it to the client */
        const token = jwt.sign(
            { _id: user._id },
            config.jwtSecret,
            { expiresIn: '7d' }
        );

        const { _id, name, email, role } = user;

        res.json({
            token: token,
            user: {
                _id,
                name,
                email,
                role
            }
        })
    })
}