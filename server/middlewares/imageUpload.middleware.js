const multer = require('multer')
const path = require('path')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

/* configuring multer instance for avatar uploads */
module.exports = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {                                   /* setting file path. Path must exist */
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];                       /* setting filename extension */
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        },
        fileFilter: (req, file, cb) => {
            const isValid = !!MIME_TYPE_MAP[file.mimetype];                 /* trick to converting a match into a truthy/falsy value */
            let error = isvalid ? null : new Error('invalid mime type')
            cb(error, isValid);
        }
    })
});