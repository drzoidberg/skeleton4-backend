const User = require('../models/user.model');

module.exports = (req, res, next) => {
                                                                            /* req.user is added in the requireSignin middleware,
                                                                                so now we have access to the user id */
    User.findById({_id: req.user._id }).exec((err, user) => {
        if(err || !user) {
            return res
                .status(400)
                .json({
                    isAdminError: 'User not found'
                });
        }
                                                                            /* if user is admin, attach the user data to
                                                                                the key 'profile' and proceed to the next
                                                                                middleware */
        if (user.role !== 'admin') {
            return res
                .status(400)
                .json({
                    isAdminError: 'Admin resource. Access denied'
                });
        }

        req.profile = user;
        next();
    })
}