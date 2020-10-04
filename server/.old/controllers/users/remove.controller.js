const errorHandler = require('../../lib/dbErrorHandlers.helpers');

// delete user
module.exports = async (req, res, next) => {
    try {
        // bringing user data
        let user = req.profile;
        let deletedUser = await user.remove();

        // resetting hashed_password & salt for security purposes
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;

        res.json(deletedUser);
    } catch (error) {
        return res
            .status(400)
            .json({
                message: errorHandler.getErrorMessage(error),
            });
    }
};