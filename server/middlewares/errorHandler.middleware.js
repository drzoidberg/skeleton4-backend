/* middleware that fires only if previous error situations aren't fired
    it's placed near the end of the code, after the routes are mounted &
    before the app is exported
*/

module.exports = (error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {                           /* this kind of error is created by expressJwt */
        res.status(401).json({
            error: error.name + ': ' + error.message,
        });
    } else if (error) {
        res.status(400).json({
            error: error.name + ': ' + error.message,
        });
    }


                                        /* the last & most generic error handler,
                                            if no other errors handlers are being
                                            triggered, this will  */
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occurred',
    });
};
