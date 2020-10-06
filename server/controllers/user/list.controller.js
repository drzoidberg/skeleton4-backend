const User = require('../../models/user.model');

module.exports = (req, res) => {
    const page = req.query.page || 1;                       /*  a default value if page is not set by the client */

    const PAGE_SIZE = 12;                                   // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
    const skip = (page - 1) * PAGE_SIZE;

    User
        .find()
        .sort({ _id: -1 })                                  /* to sort documents by newest first */
        .skip(skip)                                         /* .skip & .limit serves as a  */
        .limit(PAGE_SIZE)
        .select('name email updatedAt createdAt')           /* selects specific fields you want to return in the response */
        .exec((err, users) => {
            if (err || !users) {
                return res.status(400).json({
                    listError: 'Users not found'
                });
            }
            res.json(users);
        })
};