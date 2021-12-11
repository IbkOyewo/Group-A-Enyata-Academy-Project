const dotenv = require('dotenv');
const cloudinary = require('cloudinary')
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const {
  cloudinaryApplicationConfig,
  cloudinaryAssessmentConfig
} = require("../utils/helpers");


const cloudinaryUpload = async (req,res, next) => {
  try {
    //console.log(req.files);
    let cvPath = req.files.cv[0].path
    let imagePath = req.files.image[0].path
    const cvData = await cloudinary.uploader.upload(cvPath)
    const imageData = await cloudinary.uploader.upload(imagePath)
    const data = [cvData, imageData]
    req.body.cv = data[0].secure_url;
    req.body.image = data[1].secure_url;
    //console.log(req.body);
    next()
  } catch (error) {
    console.log(error);
    return error;
  }
}

// const cloudinaryApplicationUpload = async (req, res, next) => {
//   try {
//     const data = await cloudinaryApplicationConfig(req);
//     req.imageUrl = data.secure_url;
//   } catch (error) {
//     console.log(error);
//   }
// };

const cloudinaryAssessmentUpload = async (req, res, next) => {
  try {
    const data = await cloudinaryAssessmentConfig(req);
    req.imageUrl = data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  cloudinaryUpload,
  cloudinaryAssessmentUpload
}