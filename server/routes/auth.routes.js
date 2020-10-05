const express = require('express');

const {
    userSignupValidator,
    userSigninValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
} = require('../validators/auth');

const {
    accountActivationController,
    forgotPasswordController,
    googleLoginController,
    resetPasswordController,
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

router.post('/account-activation',
    accountActivationController);

router.post('/forgot-password',
    forgotPasswordValidator,
    runValidationMiddleware,
    forgotPasswordController
);

router.post('/reset-password',
    resetPasswordValidator,
    runValidationMiddleware,
    resetPasswordController
);

router.post('/google-login',
    googleLoginController)
module.exports = router;