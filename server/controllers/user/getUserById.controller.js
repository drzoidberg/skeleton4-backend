const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

// @description Get user by ID
// @route       GET /api/users/:id
// @access      Private/Admin
module.exports = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
