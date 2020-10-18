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
        controllers.getUserByToken
    )
    .put(
        middlewares.isAuthorized,
        validators.updateUserByToken,
        middlewares.runValidations,
        controllers.updateUserByToken
    )
    .delete(
        middlewares.isAuthorized,
        // validators.removeUserByToken,
        // middlewares.runValidations,
        controllers.removeUserByToken
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
        controllers.getUserById
    )
    .put(
        middlewares.isAuthorized,
        middlewares.isAdmin,
        validators.updateUserById,
        middlewares.runValidations,
        controllers.updateUserById
    )
    .delete(
        middlewares.isAuthorized,
        middlewares.isAdmin,
        validators.removeUserById,
        middlewares.runValidations,
        controllers.removeUserById
    )


module.exports = router
