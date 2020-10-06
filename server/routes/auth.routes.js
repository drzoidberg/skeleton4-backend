const express = require('express');

const {
    forgotPasswordValidator,
    resetPasswordValidator,
    userSigninValidator,
    userSignupValidator,
} = require('../validators/');

const {
    accountActivationController,
    forgotPasswordController,
    googleLoginController,
    resetPasswordController,
    signinController,
    signupController
} = require('../controllers/auth');

const { runValidationsMiddleware } = require('../middlewares/')

const router = express.Router();

router.post('/signup',
    userSignupValidator,
    runValidationsMiddleware,
    signupController
);

router.post('/signin',
    userSigninValidator,
    runValidationsMiddleware,
    signinController
);

router.post('/account-activation',
    accountActivationController);

router.post('/forgot-password',
    forgotPasswordValidator,
    runValidationsMiddleware,
    forgotPasswordController
);

router.post('/reset-password',
    resetPasswordValidator,
    runValidationsMiddleware,
    resetPasswordController
);

router.post('/google-login',
    googleLoginController)
module.exports = router;