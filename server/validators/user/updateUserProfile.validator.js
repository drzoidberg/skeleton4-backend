const { check } = require('express-validator');

module.exports = [
    check('name')
        .not().isEmpty().withMessage('Name is required'),
    check('email')
        .not().isEmpty().withMessage('The email field must be filled')
        .isEmail().withMessage('Must be a valid email address'),
    check('isAdmin')
        .not().isEmpty().withMessage('The isAdmin field must be filled'),
    check('password')
        .not().isEmpty().withMessage('The password field must be filled')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];