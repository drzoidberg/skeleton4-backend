const express = require('express');
const { signinController, signoutController } = require('../controllers/auth');

const router = express.Router();

router
    .route('/auth/signin')
    .post(signinController)

router
    .route('/auth/signout')
    .get(signoutController)

module.exports = router;