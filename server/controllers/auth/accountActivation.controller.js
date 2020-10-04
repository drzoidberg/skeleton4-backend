const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

module.exports = (req, res) => {
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if(err) {
                console.log('jwt verify in account activation error ', err);
                return res
                    .status(401)
                    .json({
                        error: 'Expired link. Signup again'
                    })
            }

            const { name, email, password } = jwt.decode(token);
            const user = new User({ name, email, password })

            user.save((err, user) => {
                if (err) {
                    console.log('save usr in account activation error', err);
                return res
                    .status(401)
                    .json({
                        error: 'Error saving user in database. Try signup again'
                    });
                }
                return res.json({
                    message: 'Sigunp success. Please signin'
                })
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Please try again'
        })
    }
}