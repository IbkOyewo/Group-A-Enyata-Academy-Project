const {
  cloudinaryConfig, cloudinaryApplicationConfig, cloudinaryAssessmentConfig
} = require("../utils/helpers");


const cloudinaryUpload = async (req, res, next) => {
  try {
    const data = await cloudinaryConfig(req);
    req.cv = data[0].secure_url;
    req.image = data[1].secure_url;
  } catch (error) {
    console.log(error);
  }
};

const cloudinaryApplicationUpload = async (req, res, next) => {
  try {
    const data = await cloudinaryApplicationConfig(req);
    req.imageUrl = data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

const cloudinaryAssessmentUpload = async (req, res, next) => {
  try {
    const data = await cloudinaryAssessmentConfig(req);
    req.imageUrl = data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { cloudinaryUpload, cloudinaryApplicationUpload, cloudinaryAssessmentUpload }