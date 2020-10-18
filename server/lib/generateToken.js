const jwt = require('jsonwebtoken');
const config = require('../config/env.config');

module.exports = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '7d',
    });
};
