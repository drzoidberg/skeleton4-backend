// logout
module.exports = (req, res) => {

    // removing cookie
    res.clearCookie('t')
    return res
        .status(200)
        .json({
            message: 'Signed out'
        });
};