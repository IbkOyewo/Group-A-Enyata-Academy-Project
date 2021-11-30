
const validateAdmin = async(req,res,next) =>{
    console.log(req.body);
    try {
        const { body:{email, password}} = req;
        if (email !== 'admin@enyata.com' && password !== 'admin'){
            return res.status(400).json({
                status:"Failed",
                message:  'You are not authorised to proceed',
            })
            
        }
       return next()
    } catch (error) {
        return next(error)
    }
}
module.exports = validateAdmin