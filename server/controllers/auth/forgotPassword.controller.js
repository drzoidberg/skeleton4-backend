const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const User = require('../../models/user.model');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res, next) => {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res
                .status(400)
                .json({
                    error: 'user with that email does not exist'
                });
        };

        const token = jwt.sign(
            { _id: user._id, name: user.name },
            process.env.JWT_RESET_PASSWORD,
            {
                expiresIn: '10m'
            }
        )

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password reset link`,
            html: `
            <h1>Please use the following link to reset your password</h1>
            <a href="${process.env.CLIENT_URL}/auth/password/reset/${token}">${process.env.CLIENT_URL}/auth/password/reset/${token}</a>
            <hr/>
            <p>This email may contain sensitive information</p>
            <p>${process.env.CLIENT_URL}</p>
            `
        }

        return user.updateOne({ resetPasswordLink: token }, (err, sucess) => {
            if(err) {
                return res
                    .status(400)
                    .json({
                        error: 'Database connection error on user password forgot request'
                    })
            } else {
                sgMail
                    .send(emailData)
                    .then(sent => {
                        // console.log('email sent');
                        return res.json({
                            message: `Email has been sent to ${email}. Follow the instructions to change your password`
                        })
                    })
                    .catch(err => {
                        // console.log('signup email send failed', err);
                        return res.json({
                            error: err.message
                        })
                    })
            }
        })

    });
}