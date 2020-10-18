const asyncHandler = require('express-async-handler')
const generateToken = require('../../lib/generateToken')
const User = require('../../models/user.model')

// @description Login user: authenticate user & get token
// @route       POST /api/users/login
// @access      Public
module.exports = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
