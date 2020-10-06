const User = require('../../models/user.model');

// retrieve all user values
module.exports = async (req, res, next, id) => {
    try {
        // read right from db all values of user
        let user = await User.findById(id);
        if (!user) {
            return res
                .status(400)
                .json({
                    error: `User not found`,
                });
        }

        /* storing all user values in 'req.profile' key,
            making them available for the rest of the controllers */
        req.profile = user;
        next();
    } catch (error) {
        return res
            .status(400)
            .json({
                error: `Could not retrieve user`,
            });
    }
};

