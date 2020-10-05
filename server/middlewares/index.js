module.exports = {
    imageUploadMiddleware: require('./imageUpload.middleware'),
    isAdminMiddleware: require('./isAdmin.middleware'),
    isAuthenticatedMiddleware: require('./isAuthenticated.middleware'),
    isAuthorizedMiddleware: require('./isAuthorized.middleware'),
    manualCorsMiddleware: require('./manualCors.middleware'),
    runValidationsMiddleware: require('./runValidations.middleware'),
    unauthorizedErrorMiddleware: require('./unauthorizedError.middleware')
}