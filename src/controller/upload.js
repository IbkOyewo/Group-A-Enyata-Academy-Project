
const { cloudinaryConfig, uploader } = require('../utils/helpers')

cloudinaryConfig()
module.exports = async (req, res, next) => {
	try {
		const { data, file } = req
		// Upload image to cloudinary
		const {
			public_id, format, original_filename, url, secure_url,
		} = await uploader.upload(data.content, {
			folder: 'enyata/academy/',
			use_filename: true,
			filename_override: file.originalname,
			resource_type: 'auto',
			allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx'],
		})

		res.status(200).json({
            status: "Success",
            message: "File uploaded successfully",
            data: {
				public_id, format, original_filename, url, secure_url,
			},
        })
	} catch (err) {
		next(err)
	}
}