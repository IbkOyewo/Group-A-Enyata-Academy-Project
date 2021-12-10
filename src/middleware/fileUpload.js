const {
  cloudinaryConfig,
  cloudinaryApplicationConfig,
  cloudinaryAssessmentConfig
} = require("../utils/helpers");


const cloudinaryUpload = async (req, res, next) => {
  try {
    // console.log("helllo");
    // const file = req.file
    // console.log(file);
  //  let cvPath = req.files.cv[0].path;
  //  let imagePath = req.files.image[0].path;
  // const data = await cloudinaryConfig(cvPath, imagePath);
  //   console.log(data);
    //req.files.cv = data[0].secure_url;
  //   req.files.image = data[1].secure_url;
   let cvPath = req.body.cv;
   let imagePath = req.body.image;
    const data = await cloudinaryConfig(cvPath, imagePath);
    console.log(data);
    
    req.body.image = data[1].secure_url;
    //console.log(req.body);
    req.body.cv = data[0].secure_url;
    console.log(req.body);
  
    // console.log(req.files);
    // console.log(req.body);
    next();
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
module.exports = {
  cloudinaryUpload,
  cloudinaryApplicationUpload,
  cloudinaryAssessmentUpload
}