// used for protecting routes that need authorization
module.exports = (req, res, next) => {
    const authorized =
        req.profile &&                                  // populated by userById in user.controller
        req.auth &&                                     // populated by hasAuthentication here, in auth.hasAuthentication. Proves that user has token
        req.profile._id == req.auth._id                 // the userid logged in & and the userid that has the current token match

    if(!(authorized)) {
        return res
            .status(403)
            .json({
                error: 'User not authorized'
            });
    };
    next();
}