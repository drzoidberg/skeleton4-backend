const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

// @description Get user profile
// @route       GET /api/users/profile
// @access      Private
module.exports = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
