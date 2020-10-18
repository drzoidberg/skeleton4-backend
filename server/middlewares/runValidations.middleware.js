const { validationResult } = require('express-validator');

                                                            /* if there's a validation error captured when during
                                                                the validation in the fields passed, show the first.
                                                                The other ones doesn't matter */
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                runValidationsError: errors.array()[0].msg
            });
    }
    next();
}

