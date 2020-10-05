const jwt = require('jsonwebtoken');

const config = require('../../../config/config');
const User = require('../../models/user.model');

module.exports = (req, res) => {
    const { token } = req.body;

    if (token) {
        jwt.verify(token, config.jwtAccountActivation, function(err, decoded) {
            if(err) {
                console.log('accountActivation error. Verifying jwt in account', err);
                return res
                    .status(401)
                    .json({
                        accountActivationError: 'Expired link. Please signup again'
                    })
            }

            /* if no error, extract name, email & password from stored token */
            const { name, email, password } = jwt.decode(token);
            const user = new User({ name, email, password })

            user.save((err, user) => {
                if (err) {
                    // console.log('accountActivation error. Saving user in account', err);
                    return res
                        .status(401)
                        .json({
                            accountActivationError: 'Error saving user in database. Please signup again'
                        });
                }
                return res.json({
                    message: 'Signup success! Please signin'
                })
            });
        });
    } else {
        return res.json({
            accountActivationError: 'Something went wrong. Please try again'
        })
    }
}