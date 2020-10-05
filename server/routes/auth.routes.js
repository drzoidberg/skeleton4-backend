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

const runValidationsMiddleware = require('../middlewares/runValidations.middleware')

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