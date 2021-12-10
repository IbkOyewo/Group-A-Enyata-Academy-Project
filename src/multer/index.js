let multer = require('multer');


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file type");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

// const fileFilters = (req, file, cb) => {
//   const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg", "image/jpg", "image/png"];
//   if (!allowedTypes.includes(file.mimetype)) {
//     const error = new Error("Incorrect file type");
//     error.code = "INCORRECT_FILETYPE";
//     return cb(error, false)
//   }
//   cb(null, true);
// }

var storageuser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'images/users')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/adminfiles')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// })

// var storageprofile = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/userpics')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// })

// var storageprofileAd = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/adminpics')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// })

var uploadUser = multer({
  storage: storageuser,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
}
);

// var uploadImage = multer({
//   storage: storageuser,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilters
// });

// var uploadProfile = multer({
//   storage: storageprofile,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilters
// });

// var uploadProfileAd = multer({
//   storage: storageprofileAd,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilters
// });

module.exports = {uploadUser}