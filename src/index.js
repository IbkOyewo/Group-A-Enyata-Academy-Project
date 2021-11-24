const express = require('express')
// const route = require('./routes')
const db = require('./db')
const cors = require('cors')
const app = express()
const port =process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        code: 200,
        message: "Welcome"
    })
})
// app.use(route)
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