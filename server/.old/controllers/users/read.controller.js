// read user
module.exports = (req, res, next) => {

    // resetting hashed_password & salt for security purposes
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
};