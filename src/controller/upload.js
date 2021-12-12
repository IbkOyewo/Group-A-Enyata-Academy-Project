const uploadFiles = async (req, res, next) =>{
	try {
		if(req.files){
			res.status(201).json({ 
				data: req.body
			});
			console.log(req.body);
		}else{
			console.log("File is not uploaded");
		}
	} catch (error) {
		console.log(error);
	}
	next()		
}
module.exports = uploadFiles