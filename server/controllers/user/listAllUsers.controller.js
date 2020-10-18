const asyncHandler = require('express-async-handler')

// @description Get all users
// @route       GET /api/users
// @access      Private/Admin
module.exports = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})
