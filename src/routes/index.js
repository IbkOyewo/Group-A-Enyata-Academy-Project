const express = require('express')
const dotenv = require('dotenv')
const { adminLog, register } = require('../controller')
const validateAdmin = require('../validation')

dotenv.config()

const router = express.Router()

router.post("/api/admin/login", validateAdmin, adminLog)
router.post("/api/user/application", register)

module.exports = router