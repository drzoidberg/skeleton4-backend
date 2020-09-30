const User = require('../models/user.model');
const extend = require('lodash/extend');
const errorHandler = require('../helpers/dbErrorHandler');

// create a user
const create = async (req, res) => {
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

// list all users
const list = async (req, res) => {
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

// retrieve all user values
const userById = async (req, res, next, id) => {
    try {
        // read right from db all values of user
        let user = await User.findById(id);
        if (!user) {
            return res
                .status(400)
                .json({
                    error: 'User not found',
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
                error: 'Could not retrieve user',
            });
    }
};

// read user
const read = (req, res, next) => {

    // resetting hashed_password & salt for security purposes
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
};

// update user
const update = async (req, res) => {
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

const remove = async (req, res, next) => {
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

module.exports = {
    create,
    list,
    userById,
    read,
    update,
    remove,
};
