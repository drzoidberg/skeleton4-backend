const User = require('../../models/user.model');
const errorHandler = require('../../lib/dbErrorHandlers.helpers');

// create a user
module.exports = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.
            status(200)
            .json({
                message: 'Successfully signed up!',
            });
    } catch (err) {
        return res
            .status(400)
            .json({
                error: errorHandler.getErrorMessage(err),
            });
    }
};