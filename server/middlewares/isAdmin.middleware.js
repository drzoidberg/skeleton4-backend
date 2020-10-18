module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error(`Not authorized. You don't have admin privileges`)
    }
}
