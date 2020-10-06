const { check } = require('express-validator');

module.exports  = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];