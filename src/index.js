const express = require('express')
const app = express()
const route = require("./router");
const db = require("./db");
const cors = require("cors");
const port = process.env.PORT || 8082;
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: "dg5fryozh",
  api_key: "769669788762336",
  api_secret: "xShiOlK8Z4Xl1lvhz1-f6buHVrY"
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Welcome",
  }); 
});
// app.post("/image-upload", (request, response) => {
//   // collected image from a user
//   const data = {
//     image: request.body.image,
//   }

//   // upload image here
//   cloudinary.uploader.upload(data.image)
//   .then((result) => {
//     response.status(200).send({
//       message: "success",
//       result,
//     });
//   }).catch((error) => {
//     response.status(500).send({
//       message: "failure",
//       error,
//     });
//   });
// })
app.use(route);
app.use(cors());

//ERROR HANDLING
app.use((req, res) => {
    res.status(404).json({
        status: "Not Found",
    })
})
app.use((err, req, res, next) => {
    res.status(400).json({
        status: "Failed",
        message: err.message
    })
})

db.connect()
    .then((obj) => {
        app.listen(port, () => {
            console.log(`Starting on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("error");
    });

module.exports = app