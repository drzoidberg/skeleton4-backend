const User = require('../../models/user.model');

module.exports = (req, res) => {
    const { name, password } = req.body;                                    /* email is not allowed to update due to security issues */
                                                                            /* req.user is added in the requireSignin middleware,
                                                                                so now we have access to the user id */
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                updateError: 'User not found'
            });
        }
        user.name = name;
        user.password = password;

        user.save((err, updatedUser) => {
            if (err) {
                // console.log('user update error', err);
                return res.status(400).json({
                    updateError: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;                        /* resetting hashed_password & salt in the response */
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};
