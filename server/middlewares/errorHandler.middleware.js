module.exports = (error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
        res.status(401).json({
            error: error.name + ': ' + error.message,
        });
    } else if (err) {
        res.status(400).json({
            error: error.name + ': ' + error.message,
        });
    }

    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occurred',
    });
};
