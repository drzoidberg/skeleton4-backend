const env = require('../config/env.config');

// setting http headers for allowing only a different origin: the one specified in the .env file
module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${env.projectProtocol}${env.projectIp}:${env.frontendPort}`);
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
