const nodemailer = require('nodemailer');

function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

const signup = async (req, res) => {

  const { email } = req.body;
  
  // TODO: Almacenar email y el código en la base de datos.

  // Genera un código de verificación.
  const codigoVerificacion = generateVerificationCode();
  console.log("Code:", codigoVerificacion);

  // Sends the code via email
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASS,
      },
    });

  const mailOptions = {
      from: `"App login" <${process.env.USER}>`, // sender address
      to: email, // receiver
      subject: "This is login code email ✔", // Subject line
      text: `Here is your verification code: ${codigoVerificacion}`, // plain text body
      html: `<b>Here is your verification code: ${codigoVerificacion}</b>`, // html body
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification code: ' + error);
      res.status(500).send('Error sending verification code.');
    } else {
      console.log('Verification code sent: ' + info.response);
      res.send('Verification code succesfully sent.');
    }
  });
}

module.exports = {
  signup,
}