const express = require('express');

const userControllers = require('../controllers/user.controllers');
const authControllers = require('../controllers/auth.controllers');
const imageUpload = require('../middlewares/imageUpload.middlewares');


const router = express.Router();

router
    .route('/api/users')
    .get(userControllers.list)
    .post(userControllers.create);

router
    .route('/api/users/:uid')
    .get(
        authControllers.hasAuthentication,
        userControllers.read)
    .patch(
        authControllers.hasAuthentication,
        authControllers.hasAuthorization,
        imageUpload.single('avatar'),
        // imageUpload.array('avatar', 1),
        // imageUpload.fields([{ name: 'avatar', maxCount: 0 }]),
        userControllers.update
    )
    .delete(
        authControllers.hasAuthentication,
        authControllers.hasAuthorization,
        userControllers.remove
    );

router.param('uid', userControllers.userById);

module.exports = router;
