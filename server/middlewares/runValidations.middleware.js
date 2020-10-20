const { validationResult } = require('express-validator');

                                                            /* if there's a validation error captured when during
                                                                the validation in the fields passed, show the first.
                                                                The other ones doesn't matter */
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)                                    /* The server understands the content type of the request entity,
                                                                and the syntax of the request entity is correct,
                                                                but was unable to process the contained instructions. */
            .json({
                message: errors.array()[0].msg
            });
    }
    next();
}

