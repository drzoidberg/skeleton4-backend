const User = require('../../models/user.model');

// removes user already authenticated

module.exports = (req, res) => {
    const userId = req.user._id;                                /* user data (req.user key) populated by isAuthenticatedMiddleware */
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                removeError: 'User not found'
            });
        }
        user.remove();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
}