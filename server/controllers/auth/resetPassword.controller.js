const jwt = require('jsonwebtoken');
const _ = require('lodash');

const config = require('../../../config/config');
const User = require('../../models/user.model');


module.exports = (req, res) => {
    return res.json({
        message: 'dins!'
    })
}
// module.exports = (req, res, next) => {
//     const { resetPasswordLink, newPassword} = req.body; /* available in the User schema */

//     if(resetPasswordLink) {                                                             /* if there's a link in the req.body… */
//         jwt.verify(resetPasswordLink, config.jwtResetPassword, function (err, decoded) {
//             if (err) {
//                 return res
//                     .status(410)                            /* 410 GONE: access to the target resource is no longer available at
//                                                                 the origin server and that this condition is likely to be permanent. */
//                     .json({
//                         resetPasswordError: 'Expired link. Please request another password link'
//                     });
//                                                                             /* by elimination, it is an 'expired link' error
//                                                                                 because jwt.verify() works w/ an env variable &
//                                                                                 resetPasswordLink, & accountActivation controller
//                                                                                 works so far */
//             }
//             /* if no error, perform the task… */
//             User.findOne({ resetPasswordLink }, (err, user) => {
//                 if (err || !user) {                                  /* if there's an error finding the user or user don't exist… */
//                     return res
//                     .status(400)            /* 400 Bad request: the server cannot or will not process the request due to something
//                                                 that is perceived to be a client error  */
//                     .json({
//                         resetPasswordError: 'Something went wrong. Please try again later'
//                     });
//                 }
//                 /* otherwise prepare the fields to be updated in the db */
//                 const updatedFields = {
//                     password: newPassword,
//                     resetPasswordLink: ''                           /* reset the field. Not longer needed */
//                 }
//                 user = _.extend(user, updatedFields);               /* useful lodash method for 'kind of merging' (extending) objects */
//                 user.save((err, result) => {
//                     if(err) {
//                         return res
//                         .status(400)
//                         .json({
//                             resetPasswordError: 'Error resetting user password'
//                         });
//                     }
//                     res.json({
//                         message: `Great! now you can login with your password`
//                     })
//                 })
//             });
//         });
//     }
// }