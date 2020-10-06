// checks if the authenticated userid & the desired user's userid to manipulate match

module.exports = (req, res, next) => {
    const authenticatedUserId = req.user._id;                               /* user data (req.user key) populated by isAuthenticatedMiddleware */
    const desiredUserIdByParam = req.params.id;                             /* extracted from params */

    const authorized =
        authenticatedUserId &&
        ( desiredUserIdByParam || desiredUserIdByToken ) &&
        authenticatedUserId === ( desiredUserIdByParam || desiredUserIdByToken )

    if(!(authorized)) {
        return res
            .status(403)
            .json({
                isAuthorizedError: 'User not authorized'
            });
    };
    next();
}