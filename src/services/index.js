const db = require('../db')
const queries = require('../db/queries')

const logAdmin = async (data) => {
    const payload = [data.email, data.password]
    return db.any(queries.adminLogin, payload)
}

const userForm= async (data) => {
    const payload = [data.fname, data.lname, data.email, data.cpga, data.address, data.course, data.university, data.dob]
    return db.any(queries.userApplication, payload)
}

module.exports = {
    logAdmin,
    userForm
}