const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

// @description Remove user
// @route       DELETE /api/users/:id
// @access      Private/Admin
module.exports = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
