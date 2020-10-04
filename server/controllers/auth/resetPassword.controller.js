const jwt = require('jsonwebtoken');
const _ = require('lodash');

const User = require('../../models/user.model');

module.exports = (req, res, next) => {
    const { resetPasswordLink, newPassword} = req.body; /* available in the User schema */

    if(resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err, decoded) {
            if (err) {
                return res
                    .status(400)
                    .json({
                        error: 'Expired link. Try again'
                    });
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res
                    .status(400)
                    .json({
                        error: 'Something went wrong. Try later'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                }
                user = _.extend(user, updatedFields);
                user.save((err, result) => {
                    if(err) {
                        return res
                        .status(400)
                        .json({
                            error: 'Error resetting user password'
                        });
                    }
                    res.json({
                        message: `Great! now you can login with your password`
                    })
                })
            });
        });
    }
}