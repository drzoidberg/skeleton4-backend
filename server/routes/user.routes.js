const express = require('express');

const {
    userRemoveValidator,
    userUpdateValidator
} = require('../validators/');

const {
    isAdminMiddleware,
    isAuthenticatedMiddleware,
    isAuthorizedMiddleware,
    runValidationsMiddleware
    // imageUploadMiddleware
} = require('../middlewares');

const {
    listController,
    readController,
    removeController,
    updateController
} = require('../controllers/user')

const router = express.Router();

router.get('/user/:id',
    isAuthenticatedMiddleware,
    readController
);

/* implement */
router.get('/users/',
    isAuthenticatedMiddleware,
    listController
);

/* implement image upload, isAuthorizedMiddleware */
router.put('/user/update',
    isAuthenticatedMiddleware,
    isAuthorizedMiddleware,
    // imageUploadMiddleware.single('avatar'),
    userUpdateValidator,
    runValidationsMiddleware,
    updateController
);

/* implement, removeController, userRemoveValidator */
router.get('/users/',
    isAuthenticatedMiddleware,
    isAuthorizedMiddleware,
    removeController
);

router.put('/admin/update',
    isAuthenticatedMiddleware,
    isAdminMiddleware,
    updateController
);

module.exports = router