module.exports = {
    isAdminMiddleware: require('./isAdmin.middleware'),
    imageUploadMiddleware: require('./imageUpload.middleware'),
    manualCorsMiddleware: require('./manualCors.middleware'),
    requireSigninMiddleware: require('./requireSignin.middleware'),
    runValidationsMiddleware: require('./runValidations.middleware'),
    unauthorizedErrorMiddleware: require('./unauthorizedError.middleware')
}