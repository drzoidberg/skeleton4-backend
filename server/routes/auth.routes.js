const express = require('express');
const authControllers = require('../controllers/auth.controllers');

const router = express.Router();

router
    .route('/auth/signin')
    .post(authControllers.signin)

router
    .route('/auth/signout')
    .get(authControllers.signout)

module.exports = router;