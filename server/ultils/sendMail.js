const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler')
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
const sendMail =  asyncHandler(async ({email,html}) => {
    const info = await transporter.sendMail({
        from: '"DiDongGenZ " <no-replyfoo@didonggenz.com>', // sender address
        to: email, // list of receivers
        subject: "Quên mật khẩu", // Subject line
        html: html, // html body
      });
    
    return info;
})
module.exports = sendMail