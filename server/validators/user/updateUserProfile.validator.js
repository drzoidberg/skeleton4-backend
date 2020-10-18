const { check } = require('express-validator');

module.exports = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('The name is required'),
    check('email')
        .not().isEmpty().withMessage('The email is required')
        .isEmail().withMessage('The email must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('The password must be at least 6 characters long'),
];