const multer = require('multer');
const { v1: uuid } = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

/* configuring multer instance for avatar uploads */
const imageUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {                                   /* setting file path. Path must exist */
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];                       /* setting filename extension */
            cb(null, uuid() + '.' + ext);                                   /* generating unique filename using uuid library */
        },
        fileFilter: (req, file, cb) => {
            const isValid = !!MIME_TYPE_MAP[file.mimetype];                 /* trick to converting a match into a truthy/falsy value */
            let error = isvalid ? null : new Error('invalid mime type')
            cb(error, isValid);
        }
    })
});

module.exports = imageUpload;