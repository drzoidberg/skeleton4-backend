const { check } = require('express-validator');

module.exports = [
    check('name')
        .not().isEmpty().withMessage('The name is required'),
    check('email')
        .not().isEmpty().withMessage('The email is required')
        .isEmail().withMessage('The email must be a valid email address'),
    check('password')
        .not().isEmpty().withMessage('The password is required')
        .isLength({ min: 6 }).withMessage('The password must be at least 6 characters long'),
];