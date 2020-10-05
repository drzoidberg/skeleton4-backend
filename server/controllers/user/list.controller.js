const User = require('../../models/user.model');

// temporarily filled


module.exports = (req, res) => {
    let users = User
        .find()
        .select('name email avatar updated created')
        .exec((err, users) => {
            if (err || !users) {
                return res.status(400).json({
                    listError: 'Users not found'
                });
            }
            res.json(users);
        })
};