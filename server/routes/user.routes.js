const express = require('express')

const validators = require('../validators/user')
const middlewares = require('../middlewares')
const controllers = require('../controllers/user')

const router = express.Router()

// PUBLIC ROUTES
router
    .route('/')
    .post(
        validators.registerUser,
        middlewares.runValidations,
        controllers.registerUser
    )

router
    .route('/login')
    .post(
        validators.loginUser,
        middlewares.runValidations,
        controllers.loginUser
    )

// PROTECTED ROUTES
router
    .route('/profile')
    .get(
        middlewares.isAuthorized,
        validators.getUserProfile,
        middlewares.runValidations,
        controllers.getUserProfile
    )
    .put(
        middlewares.isAuthorized,
        validators.updateUserProfile,
        middlewares.runValidations,
        controllers.updateUserProfile
    )


// ADMIN ROUTES
router
    .route('/')
    .get(
        middlewares.isAuthorized,
        middlewares.isAdmin,
        controllers.listAllUsers
    )

router
    .route('/:id')
    .get(
        middlewares.isAuthorized,
        middlewares.isAdmin,
        validators.getUserById,
        middlewares.runValidations,
        controllers.getUserById
    )
    .put(
        middlewares.isAuthorized,
        middlewares.isAdmin,
        validators.updateUser,
        middlewares.runValidations,
        controllers.updateUser
    )
    .delete(
        middlewares.isAuthorized,
        middlewares.isAdmin,
        validators.removeUser,
        middlewares.runValidations,
        controllers.removeUser
    )


module.exports = router
