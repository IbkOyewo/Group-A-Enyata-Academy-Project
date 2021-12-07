var nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const sendApplicationEmail = async (req) => {;
  const { fname, email } = req;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  });

  let mailOptions = {
    from: '"Enyata Academy"',
    to: `${email}`,
    subject: "Enyata Software Development Academy",
    html: ` <p>Dear ${fname},</p>
    <p><b>Congratulations!</b></p>
    <p>We are thrilled to inform you that you have successfully applied for the Enyata 2022 Academy.</p>
    <p> We are currently reviewing your application.</p>
    <p>If selected, you would get an email confirming your acceptance into the Academy.</p>
    <br>
    <p><b>Warmest regards.</b></p>
    <p><b>Enyata Application Team</b></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("email error application", error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendApplicationEmail;
