const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        salt: String,
        role: {
            type: String,
            default: 'user',
        },
        resetPasswordLink: {
            data: String,
            default: '',
        },
    },
    { timestamps: true }
);

userSchema
    .virtual('password')
    .set(function (password) {
        /* temporarily create a variable called _password */
        this._password = password;
        /* generate salt, a unique string that will be used when the password finally is hashed */
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

                                                        /* each time we want to authenticate a user,
                                                            we recreate the encryption process, taking the hashed
                                                            password from the db & the plain text version that is
                                                            passed (usually in an API controller-route) when we
                                                            perform a db operation under a user model instance that
                                                            needs authentication.
                                                            If the result is a success, the user is authenticated */

userSchema.methods = {
    authenticate: function (plainText) {
        return (this.encryptPassword(plainText) === this.hashed_password);
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function () {
        return (
            Math.round(new Date().valueOf() * Math.random()) + ''  /* based on a timestamp of the moment of method execution * a random number */
        );
    },
};

module.exports = mongoose.model('User', userSchema);
