module.exports = {
    forgotPasswordValidator: require('./forgotPassword.validator'),
    // resetPasswordValidator: require('./resetPassword.validator'),
    userSignupValidator: require('./userSignup.validator'),
    userSigninValidator: require('./userSignin.validator'),
    runValidation: require('../../middlewares/runValidation.middleware')
}