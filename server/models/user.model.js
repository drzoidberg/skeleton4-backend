const mongoose = require('mongoose');
const crypto = require('crypto');

/* setting user schema */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required',
    },
    avatar: {
        type: String,
        required: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: Date,
    hashed_password: {
        /* encrypted passwords */ type: String,
        required: 'Password is required',
    },
    salt: String /* additional field to hash password */,
});

/* as the password is not stored directly in the db, it is hadled in a 'virtual' field */
UserSchema.virtual('password')
    .set(function (password) {                         /* setting the password & salt using  'virtual' methods described down */
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto                               /* native library for encrypt/decrypt */
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';       /* salt based on timestamp * 'random' number between 0 & 1 */
    },
};

UserSchema.path('hashed_password').validate(function () {
    if (                                                                     /* password validation: in the db */
        this._password &&
        this._password.length < 6
    ) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

module.exports = mongoose.model('User', UserSchema);
