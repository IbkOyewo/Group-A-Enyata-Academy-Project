const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryConfig = async (request, response) => {
  try {
    const {
      cv,
      image
    } = request

    const cvData = await cloudinary.uploader.upload(cv)
    const imageData = await cloudinary.uploader.upload(image)
    const data = [cvData, imageData]
    return data;
  } catch (error) {
    return error;
  }
}

const cloudinaryApplicationConfig = async (request, response) => {
  try {
    const {
      imageUrl
    } = request

    return await cloudinary.uploader.upload(imageUrl)
  } catch (error) {
    return error;
  }
}

const cloudinaryAssessmentConfig = async (request, response) => {
  try {
    const {
      imageUrl
    } = request

    return await cloudinary.uploader.upload(imageUrl)
  } catch (error) {
    return error;
  }
}
module.exports = {
  cloudinaryConfig,
  cloudinaryApplicationConfig,
  cloudinaryAssessmentConfig
};