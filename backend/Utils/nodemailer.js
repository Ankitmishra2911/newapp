// mailer.js
import nodemailer from 'nodemailer';
require('dotenv').config();

function sendEmail(email,subject,message){

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
  port:process.env.MAIL_PORT, // you can use any email service
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
const mailOptions = {
    from:process.env.MAIL_USER,
    to:email,
    subject:subject,
    text:message,
}
transporter.sendMail(mailOptions);
}

export default sendEmail;
