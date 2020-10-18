const { check } = require('express-validator');

module.exports = [
    check('id')
        .not().isEmpty().withMessage('id is required'),
];