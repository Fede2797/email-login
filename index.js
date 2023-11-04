const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASS,
  },
});

transporter.verify().then(console.log).catch(console.error);

transporter.sendMail({
  from: `"App login" <${process.env.USER}>`, // sender address
  to: "federico2797@gmail.com", // list of receivers
  // to: "federico2797@gmail.com, receivertwo@outlook.com", // list of receivers
  subject: "This is a test email @edigleyssonsilva ✔", // Subject line
  text: "There is a new article. It's about sending emails, check it out!", // plain text body
  html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
}).then(info => {
  console.log({info});
}).catch(console.error);