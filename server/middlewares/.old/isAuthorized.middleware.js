// checks if the authenticated userid & the desired user's userid to manipulate match

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const desiredUserIdByToken = jwt.decode(req.headers.authorization.split(' ')[1])._id
    const authenticatedUserId = req.user._id;                               /* user data (req.user key) populated by isAuthenticatedMiddleware */
    const desiredUserIdByParam = req.params.id;                             /* extracted from params */

    console.log({
        desiredUserIdByToken,
        authenticatedUserId,
        desiredUserIdByParam
    });

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