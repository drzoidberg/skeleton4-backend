const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

module.exports = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        /* check if user exist */
        if(err || !user) {
            return res
                .status(400)
                .json({
                    error: 'User with that email does not exist. Please sing up'
                });
        }
        /* authenticate */
        if(!user.authenticate(password)) {
            return res
                .status(400)
                .json({
                    error: 'Email and password do not match'
                });
        }
        /* generate token & send to client */
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { _id, name, email, role } = user;

        res.json({
            token: token,
            user: { _id, name, email, role }
        })
    })
}