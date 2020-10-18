const asyncHandler = require('express-async-handler')
const User = require('../../models/user.model')
const generateToken = require('../../lib/generateToken')

// @description Update user
// @route       PUT /api/users/profile
// @access      Private/Admin
module.exports = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
