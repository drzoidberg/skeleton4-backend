const express = require('express');

const {
    createController,
    listController,
    readController,
    removeController,
    updateController,
    userByIdController
} = require('../controllers/users')
const { hasAuthenticationController, hasAuthorizationController } = require('../controllers/auth');
const imageUploadMiddleware = require('../middlewares/imageUpload.middleware');


const router = express.Router();

router
    .route('/api/users')
    .get(listController)
    .post(createController);

router
    .route('/api/users/:uid')
    .get(
        hasAuthenticationController,
        readController)
    .patch(
        hasAuthenticationController,
        hasAuthorizationController,
        imageUploadMiddleware.single('avatar'),
        // imageUpload.array('avatar', 1),
        // imageUpload.fields([{ name: 'avatar', maxCount: 0 }]),
        updateController
    )
    .delete(
        hasAuthenticationController,
        hasAuthorizationController,
        removeController
    );

router.param('uid', userByIdController);      /* every time uid param is passed, it fires userById controller */

module.exports = router;
