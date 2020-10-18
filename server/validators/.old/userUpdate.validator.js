const { check } = require('express-validator');

module.exports = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];