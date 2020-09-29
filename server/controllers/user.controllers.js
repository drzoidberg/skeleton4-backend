const User = require('../models/user.model');
const extend = require('lodash/extend');
const errorHandler = require('../helpers/dbErrorHandler');

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

const list = async (req, res) => {
    try {
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

const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res
                .status(400)
                .json({
                    error: 'User not found',
                });
        }
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

const read = (req, res, next) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

const update = async (req, res) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        if (req.file) {
            user.avatar = req.file.path;
        }
        await user.save();
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
        let user = req.profile;
        let deletedUser = await user.remove();
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
    // optionalAvatar
};
