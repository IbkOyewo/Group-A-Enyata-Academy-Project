const express = require("express");
const app = express();
const route = require("./router");
const db = require("./db");
const cors = require("cors");
const dotenv = require("dotenv");
//const fileupload = require('express-fileupload'); 

dotenv.config();
const multer = require('multer')
var upload = multer();
const port = process.env.PORT;
//app.use(fileupload({useTempFiles: true}))
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//app.use(upload.fields([{name:"cv"},{name:"image"}])); 
//app.use(express.static('public'));
app.use(
  cors({
    origin: "*",
  })
);

// // SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg')
  }
})
 
var upload = multer({ storage: storage })
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  const text = req.body
  console.log(file, text);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})
// app.post('/uploadphoto', upload.single('picture'), (req, res) => {
//   var img = fs.readFileSync(req.file.path);
// var encode_image = img.toString('base64');
// // Define a JSONobject for the image attributes for saving to database

// var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//  };
// db.collection('quotes').insertOne(finalImg, (err, result) => {
//   console.log(result)

//   if (err) return console.log(err)

//   console.log('saved to database')
//   res.redirect('/')
 
   
// })
// })
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Welcome",
  });
});

app.use(route);

//ERROR HANDLING
app.use((req, res) => {
  res.status(404).json({
    status: "Not Found",
  });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({
    status: "Failed",
    message: err.message,
    
  });
});

db.connect()
  .then((obj) => {
    app.listen(port, () => {
      console.log(`Starting on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

module.exports = app;
