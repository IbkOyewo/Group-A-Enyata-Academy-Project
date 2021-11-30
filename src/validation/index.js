const validateAdmin = async (req, res, next) => {
    try {
        const {
            body: {
                email,
                password
            }
        } = req;
        if (password === 'admin' && email === 'admin@enyata.com') {
            return next()
        } else {
            return res.status(400).json({
                status: "Forbidden",
                message: 'You are not authorised to proceed',
            })
        }
    } catch (error) {
        return next(error)
    }
}
module.exports = validateAdmin