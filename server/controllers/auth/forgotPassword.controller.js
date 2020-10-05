const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const config = require('../../../config/config');
const User = require('../../models/user.model');

sgMail.setApiKey(config.sendgridApiKey);

module.exports = (req, res, next) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res
                .status(400)
                .json({
                    forgotPasswordError: `There's no user with that email`
                });
        };

        const token = jwt.sign(
            { _id: user._id, name: user.name },
            config.jwtResetPassword,
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
                <a href="${config.clientUrl}/auth/password/reset/${token}">${config.clientUrl}/auth/password/reset/${token}</a>
                <hr/>
                <p>This email may contain sensitive information</p>
                <p>${config.clientUrl}</p>
            `
        }

        return user.updateOne({ resetPasswordLink: token }, (err, sucess) => {
            if(err) {
                return res
                    .status(400)
                    .json({
                        forgotPasswordError: 'Database connection error'
                    })
            } else {
                sgMail
                    .send(emailData)
                    .then(sent => {
                        // console.log('email sent');
                        return res.json({
                            message: `An email has been sent to ${email}. Please Follow the instructions to activate your account`
                        })
                    })
                    .catch(err => {
                        // console.log('signup email send failed', err);
                        return res.json({
                            forgotPasswordError: err.message
                        })
                    })
            }
        })

    });
}