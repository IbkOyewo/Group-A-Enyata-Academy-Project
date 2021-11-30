const {logAdmin, userForm} = require("../services")
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();

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
        console.log(email);
        // if (email) {
        //     return res.status(409).json({
        //     message: `Application for ${email} has been received already`
        //     });
        // }else{
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
    //     }
    //     res.status(200).json({
    //         status: "Success",
    //         code: 200,
    //         message: "Application Successful"
    //     })
    // } 
    catch (error) {
        return next(error)
    }
//   try {
//     const { fname, lname, email, cgpa, address, course, university, isAdmin, dob } = req.body;
//     const cv = req.file.originalname
//     const userId = req.user.id
//     const data = await User.findOne({ email });

//     if (data) {
//       return res.status(409).json({
//         message: `Application for ${email} has been received already`
//       });

//     } else {
//       const newUser = new User({
//         fname,
//         lname,
//         email,
//         cgpa,
//         dob,
//         address,
//         course,
//         university,
//         cv,
//         userId,
//         isAdmin
//       });
//       await newUser.save();
//       const content = `
//             <p>Dear ${fname},</p>
//             <p>Thank you for your interest in a career opportunity at Enyata.</p>
//             <p> We have received and we are currently reviewing your application.</p>
//             <p> We thank you for taking the time to explore this opportunity with the Enyata. We encourage you to visit our website at <a href='enyata.com'>enyata.com</a> for additional openings.</p>
//             <br>
//             <p>Enyata Recruitment Team</p>`

//       var mailOptions = {
//         from: '"Enyata Academy" <babatundeademola4@gmail.com>',
//         to: `${email}`,
//         subject: 'Your application: Software Developer Academy',
//         html: content
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       })
//       return res.status(201).json({
//         message: 'Thank you for submitting your application, we will get back to you'
//       })
//     }
//   } catch (err) {
//     return next(err);
//   }
};

module.exports = {
    adminLog,
    register
}