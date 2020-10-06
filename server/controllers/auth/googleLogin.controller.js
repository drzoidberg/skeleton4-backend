const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const config = require('../../../config/config');
const User = require('../../models/user.model');
const client = new OAuth2Client(config.googleClientId);

module.exports = (req, res) => {
    const { idToken } = req.body;                                           /* idToken key passed in the frontend & recieved here */

                                                                            /* verifyIdToken method available in OAuth2Client.
                                                                                Takes a token & an audience (clientId previously generated
                                                                                in Google Cloud)  */
    client.verifyIdToken({ idToken, audience: config.googleClientId })
        .then(response => {
            const { email_verified, name, email } = response.payload;           /* it exposes 'payload' key in the response,
                                                                                    which we extract email_verified, name & email */

                                                                                /* if email_verified exists means google you're
                                                                                    succesfully logged into google… */

                                                                                /* …& you can proceed to search for that user email
                                                                                    in the db */

                                                                                /* if the user exists in the db, then return it along
                                                                                    the generated token */
            if(email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign(
                            { _id: user._id },
                            config.jwtSecret,
                            { expiresIn: '7d' }
                        )
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: {
                                _id,
                                email,
                                name,
                                role
                            }
                        })
                                                                                        /* if not, create a new one, using
                                                                                            as a password a combination of the
                                                                                            email user & the jwt secret.
                                                                                            As always, the password will be
                                                                                            stored in a hashed version */
                    } else {
                        let password = email + config.jwtSecret;
                        user = new User({ name, email, password });
                        user.save((err, user) => {
                            if(err) {
                                // console.log('error google login on user save', err);
                                return res
                                    .status(400)
                                    .json({
                                        googleLoginError: 'User signup failed. Please try again'
                                    });
                            }
                            const token = jwt.sign(
                                { _id: user._id },
                                config.jwtSecret,
                                { expiresIn: '7d' }
                            )
                            const { _id, email, name, role } = user;
                            return res.json({
                                token,
                                user: {
                                    _id,
                                    email,
                                    name,
                                    role
                                }
                            })
                        })
                    }
                })
            } else {
                return res
                    .status(400)
                    .json({
                        googleLoginError: 'Google login failed. Please try again'
                    });
            }
        })
}