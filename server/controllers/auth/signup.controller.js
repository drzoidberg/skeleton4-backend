const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const config = require('../../../config/config');
const User = require('../../models/user.model');

sgMail.setApiKey(config.sendgridApiKey);

module.exports = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email }).exec((err, user) => {
        if (user) {
            return res
                .status(401)
                .json({
                    signupError: 'The email is taken',
            });
        }
    });

    const token = jwt.sign(
        { name, email, password },
        config.jwtAccountActivation,
        { expiresIn: '10m' }
    )

    const emailData = {
        from: config.sendgridEmailFrom,
        to: email,
        subject: `Account activation link`,
        html: `
            <h1>Please use the following link to activate your account</h1>
            <a href="${config.clientUrl}/auth/activate/${token}">${config.clientUrl}/auth/activate/${token}</a>
            <hr/>
            <p>This email may contain sensitive information</p>
            <p>${config.clientUrl}</p>
        `
    }

    sgMail
        .send(emailData)
        .then(sent => {
            // console.log('email sent');
            return res.json({
                message: `An email has been sent to ${email}. Please Follow the instructions to activate your account.`
            })
        })
        .catch(err => {
            // console.log('Server signupError: Signup email send failed\n', err.response.body);
            return res.json({
                signupError: err.message
            })
        })
};