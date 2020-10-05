const express = require('express');

const {
    userUpdateValidator,
    userRemoveValidator
} = require('../validators/');

const {
    isAdminMiddleware,
    requireSigninMiddleware,
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
    requireSigninMiddleware,
    readController
);

/* implement */
router.get('/users/',
    requireSigninMiddleware,
    listController
);

/* implement image upload, isAuthorizedMiddleware */
router.put('/user/update',
    requireSigninMiddleware,
    // isAuthorizedMiddleware,
    // imageUploadMiddleware.single('avatar'),
    userUpdateValidator,
    runValidationsMiddleware,
    updateController
);

/* implement, removeController, userRemoveValidator */
router.get('/users/',
    requireSigninMiddleware,
    // isAuthorizedMiddleware,
    userRemoveValidator,
    runValidationsMiddleware,
    removeController
);

router.put('/admin/update',
    requireSigninMiddleware,
    isAdminMiddleware,
    updateController
);

module.exports = router