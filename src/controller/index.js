const {logAdmin, userForm} = require("../services")
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const { createUser, validatePassword, getUser } = require("../services");
const sendVerificationEmail = require("../utils/mailler");
dotenv.config();

const createNewUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await createUser(body);
    const { password, ...user } = newUser;

    res
      .json({
        status: "success",
        message: `created successfully`,
        data: user,
      })
      .status(201);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const token = await validatePassword(email, password);

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    } else {
      res.status(201).json({
        status: "success",
        message: "User is authenticated ",
        data: req.body,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const forgetpassword = async (req, res) => {
  try {
    const userExisted = await getUser(req.body.email);
    if (!userExisted) {
      return res.json({
        status: "failed",
        message: "User dose exist",
      });
    }
    const oneTimeToken = generate();
    sendVerificationEmail(req.body.email, oneTimeToken);
    return res
      .json({
        status: "success",
        message: "successfully sent reset password",
      })
      .status(201);
  } catch (error) {
    console.log(error.message);
  }
};

const adminLog = async (req, res, next) => {
    try {
        const {
            body
        } = req
        await logAdmin(body)
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "Admin login Successful"
        })
    } catch (error) {
        return next(error)
    }
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`
  }
});

const register = async (req, res, next) => {
    try {
        const {body} = req
        const {fname,email} = req.body;
        await userForm(body)
    
            const content = `
            <p>Dear ${fname},</p>
            <p><b>Congratulations!</b></p>
            <p>We are thrilled to inform you that you have successfully applied for the Enyata 2022 Academy.</p>
            <p> We are currently reviewing your application.</p>
            <p>If selected, you would get an email confirming your acceptance into the Academy.</p>
            <br>
            <p><b>Warmest regards.</b></p>
            <p> <a href='enyata.com'>Enyata</a></p>`

      var mailOptions = {
        from: '"Enyata Academy"',
        to: email,
        subject: 'Your application: Software Developer Academy',
        html: content
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      return res.status(201).json({
        message: 'Thank you for submitting your application, we will get back to you'
      })
    }
    catch (error) {
        return next(error)
    }
};

module.exports = { createNewUser, loginUser, forgetpassword, adminLog, register };
