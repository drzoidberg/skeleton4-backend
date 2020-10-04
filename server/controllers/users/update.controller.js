const extend = require('lodash/extend');
const errorHandler = require('../../helpers/dbErrorHandlers.helpers');

// update user
module.exports = async (req, res) => {
    try {
        // bringing user data
        let user = req.profile;

        /* Assign string-keyed properties. Next property sources overwrite
            property assignments of previous sources. */
        user = extend(user, req.body);
        user.updated = Date.now();

        /* if there's an avatar uploading, set it */
        if (req.file) {
            user.avatar = req.file.path;
        }
        await user.save();

        // resetting hashed_password & salt for security purposes
        user.hashed_password = undefined;
        user.salt = undefined;

        res.json(user);
    } catch (error) {
        return res
            .status(400)
            .json({
                message: errorHandler.getErrorMessage(error),
            });
    }
};

