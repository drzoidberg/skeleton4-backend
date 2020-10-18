const jwt = require('jsonwebtoken');
const env = require('../config/env.config');

module.exports = (id) => {
    return jwt.sign({ id }, env.jwtSecret, {
        expiresIn: '7d',
    });
};
