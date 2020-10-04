const User = require('../../models/user.model');
const errorHandler = require('../../lib/dbErrorHandlers.helpers');

// list all users
module.exports = async (req, res) => {
    try {
        // read right from db picking selected fields
        let users = await User.find().select('name email avatar updated created');
        res.json(users);
    } catch (error) {
        return res
            .status(400)
            .json({
                message: errorHandler.getErrorMessage(error),
            });
    }
};

