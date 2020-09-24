module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `http://${process.env.HOSTNAME}:${process.env.FRONTEND_PORT}`);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Credentials',
        'true'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );

    next();
};