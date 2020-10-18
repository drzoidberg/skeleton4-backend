const express = require('express')

const validators = require('../validators/user')
const middlewares = require('../middlewares')
const controllers = require('../controllers/user')

const router = express.Router()

// PUBLIC ROUTES
router
    .route('/')
    .post(
        validators.loginUser,
        controllers.loginUser
    )


// PROTECTED ROUTES
router
    .route('/profile')
    .get(
        validators.getUserProfile,
        middlewares.isAuthorized,
        controllers.getUserProfile
    )
    .put(
        validators.updateUserProfile,
        middlewares.isAuthorized,
        controllers.updateUserProfile
    )


// ADMIN ROUTES
router
    .route('/')
    .post(controllers.registerUser)
    .get(
        validators.listAllUsers,
        middlewares.isAuthorized,
        middlewares.isAdmin,
        controllers.listAllUsers
    )

router
    .route('/:id')
    .get(
        validators.getUserById,
        middlewares.isAuthorized,
        middlewares.isAdmin,
        controllers.getUserById
    )
    .put(
        validators.updateUser,
        middlewares.isAuthorized,
        middlewares.isAdmin,
        controllers.updateUser
    )
    .delete(
        validators.removeUser,
        middlewares.isAuthorized,
        middlewares.isAdmin,
        controllers.removeUser
    )

module.exports = router
