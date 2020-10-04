// mongoose error handling
const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch (err.code) {                                     /* 11000 & 11001 errors are related to duplicate keys.
                                                                    In other words: data unique field already exsists */
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = `Something went wrong`;
        }
    } else {
        for (let errorName in err.errors) {
            if (err.errors[errorName].message) {
                message = err.errors[errorName].message;
            }
        }
    }
    return message;
};

// extracting & formating the error message
const getUniqueErrorMessage = (err) => {
    let output;

    try {
        let fieldName = err.message.substring(
            err.message.lastIndexOf('.$') + 2,
            err.message.lastIndexOf('_1')
        );
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            ' already exists';
    } catch (ex) {
        output = `Unique field already exists`;
    }
    return output;
};

module.exports = { getErrorMessage };
