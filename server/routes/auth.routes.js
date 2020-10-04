const express = require('express');

const {
    userSignupValidator,
    // userSigninValidator,
    // forgotPasswordValidator,
    // resetPasswordValidator,
    runValidation
} = require('../validators');

const {
    // accountActivationController,
    // forgotPasswordController,
    // googleLoginController,
    // requireSigninController,
    // resetPasswordController,
    // signinController,
    signupController
} = require('../controllers/auth');

const router = express.Router();

router.post(
    '/signup',
    userSignupValidator,
    runValidation,
    signupController
);
