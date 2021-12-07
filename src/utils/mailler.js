var nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const Email = process.env.EMAIL;
const password = process.env.EMAILPASS;

const sendVerificationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Email,
      pass: password,
    },
  });

  const mailOptions = {
    from: Email,
    to: email,
    subject: "Verify your new account",
    html: `<p>To verify your email address, please click the link below </p> <br>
        <h4>
        <a href="http://localhost:8082/user/reset-password?verification=${token}"target="_blank"> Verify Your Account </a>
        </h4>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("email error", error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


module.exports = sendVerificationEmail;
