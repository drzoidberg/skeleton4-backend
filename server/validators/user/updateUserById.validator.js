const { check } = require('express-validator')

module.exports = [
    check('email')
        .isEmail()
        .withMessage('The email must be a valid email address'),
]
