const express = require('express');

const {
    userSignupValidator,
    userSigninValidator,
    // forgotPasswordValidator,
    // resetPasswordValidator,
} = require('../validators/auth');

const {
    // accountActivationController,
    // forgotPasswordController,
    // googleLoginController,
    // requireSigninController,
    // resetPasswordController,
    signinController,
    signupController
} = require('../controllers/auth');

const runValidationMiddleware = require('../middlewares/runValidation.middleware')

const router = express.Router();

router.post('/signup',
    userSignupValidator,
    runValidationMiddleware,
    signupController
);

router.post('/signin',
    userSigninValidator,
    runValidationMiddleware,
    signinController
);

module.exports = router;