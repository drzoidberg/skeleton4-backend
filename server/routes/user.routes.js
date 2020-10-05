const express = require('express');

const { requireSigninMiddleware, /* adminMiddleware */ } = require('../middlewares');
const { readController, /* updateController */ } = require('../controllers/user')

const router = express.Router();

router.get('/user/:id',
    requireSigninMiddleware,
    readController
);

// router.put('/user/update', requireSignin, update);
// router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router