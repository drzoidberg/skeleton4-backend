const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const User = require('../../models/user.model');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken',
            });
        }
    });

    const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
            expiresIn: '10m'
        }
    )

    const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Account activation link`,
        html: `
        <h1>Please use the following link to activate your account</h1>
        <a href="${process.env.CLIENT_URL}/auth/activate/${token}">${process.env.CLIENT_URL}/auth/activate/${token}</a>
        <hr/>
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
        `
    }

    sgMail
        .send(emailData)
        .then(sent => {
            // console.log('email sent');
            return res.json({
                message: `Email has been sent to ${email}. Follow the instructions to activate your account`
            })
        })
        .catch(err => {
            // console.log('signup email send failed', err);
            return res.json({
                error: err.message
            })
        })
};