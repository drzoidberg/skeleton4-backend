const express = require('express');

const { requireSigninMiddleware, isAdminMiddleware } = require('../middlewares');
const { readController, updateController } = require('../controllers/user')

const router = express.Router();

router.get('/user/:id',
    requireSigninMiddleware,
    readController
);

router.put('/user/update',
    requireSigninMiddleware,
    updateController
);

router.put('/admin/update',
    requireSigninMiddleware,
    isAdminMiddleware,
    updateController
);

module.exports = router