// require('dotenv').config({ path: '../../.env' });

// setting http headers for allowing only a different origin: the one specified in the .env file
module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `http://${process.env.HOSTNAME || 'localhost'}:${process.env.FRONTEND_PORT || '5000'}`);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, Accept, Authorization'
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
