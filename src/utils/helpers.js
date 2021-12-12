const dotenv = require('dotenv');
const cloudinary = require('cloudinary')
// const { config, uploader } = require('cloudinary').v2

// const cloudinaryConfig = () => config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// module.exports = { cloudinaryConfig, uploader }

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const cloudinaryConfig = async (cvPath, imagePath) => {
//   try {
//    // console.log("c",cvPath, imagePath);
//     // const {
//     //   cv,
//     //   image
//     // } = request
// //console.log(request);
//     const cvData = await cloudinary.uploader.upload(cvPath)
//     const imageData = await cloudinary.uploader.upload(imagePath)
//     const data = [cvData, imageData]
//     //console.log(data);
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

// const cloudinaryApplicationConfig = async (request, response) => {
//   try {
//     const {
//       imageUrl
//     } = request

//     return await cloudinary.uploader.upload(imageUrl)
//   } catch (error) {
//     return error;
//   }
// }

// const cloudinaryAssessmentConfig = async (request, response) => {
//   try {
//     const {
//       imageUrl
//     } = request

//     return await cloudinary.uploader.upload(imageUrl)
//   } catch (error) {
//     return error;
//   }
// }
// module.exports = {
//   cloudinaryConfig,
//   // cloudinaryApplicationConfig,
//   // cloudinaryAssessmentConfig
// };