const { check } = require('express-validator');

module.exports  = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address'),
];