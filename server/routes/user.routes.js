const express = require('express');

const {
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

router.get('/users/',
    isAuthenticatedMiddleware,
    listController
);

/* implement imageUploadMiddleware, isAuthorizedMiddleware */
router.put('/user/update',
    isAuthenticatedMiddleware,
    // isAuthorizedMiddleware,
    // imageUploadMiddleware.single('avatar'),
    userUpdateValidator,
    runValidationsMiddleware,
    updateController
);

/* implement removeController, isAuthorizedMiddleware */
router.delete('/users/',
    isAuthenticatedMiddleware,
    // isAuthorizedMiddleware,
    removeController
);

router.put('/admin/update',
    isAuthenticatedMiddleware,
    isAdminMiddleware,
    userUpdateValidator,
    runValidationsMiddleware,
    updateController
);

module.exports = router