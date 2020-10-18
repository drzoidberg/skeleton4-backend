const { check } = require('express-validator');

module.exports = [
    check('name')
        .not().isEmpty().withMessage('Name is required'),
    check('email')
        .not().isEmpty().withMessage('The email field must be filled')
        .isEmail().withMessage('Must be a valid email address'),
];