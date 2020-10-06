const User = require('../../models/user.model');

// temporarily filled


module.exports = (req, res) => {
    let users = User
        .find()
        .select('name email updatedAt createdAt') /* selects specific fields you want to return in the response */
        .exec((err, users) => {
            if (err || !users) {
                return res.status(400).json({
                    listError: 'Users not found'
                });
            }
            res.json(users);
        })
};