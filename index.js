const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { dbConnection } = require('./database/config');
dotenv.config();

const app = express();
const port = 3000;

const connectDB = async () => {
  await dbConnection();
}

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Bienvenido a la aplicación de registro y validación de correo.');
});

// Ruta de registro: Enviar código de verificación al correo.
app.post('/signup', (req, res) => {
  const { email } = req.body;

  // Genera un código de verificación.
  const codigoVerificacion = generateVerificationCode();

  // Almacena el código en la base de datos temporal (puedes usar una base de datos real en producción).
  verificationCodes.set(email, codigoVerificacion);

  // Envía el código por correo electrónico.
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tu_correo@gmail.com',
      pass: 'tu_app_password', // Utiliza un App Password o una solución más segura.
    },
  });

  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: email,
    subject: 'Código de Verificación',
    text: `Tu código de verificación es: ${codigoVerificacion}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando el código de verificación: ' + error);
      res.status(500).send('Error al enviar el código de verificación.');
    } else {
      console.log('Código de verificación enviado: ' + info.response);
      res.send('Código de verificación enviado con éxito.');
    }
  });
});

// Ruta de validación del código de verificación.
app.post('/confirmsignup', (req, res) => {
  const { email, codigo } = req.body;

  // Obtiene el código de verificación almacenado para el correo electrónico.
  const storedCode = verificationCodes.get(email);

  if (storedCode && Number(codigo) === storedCode) {
    // Código válido: permite el registro.
    verificationCodes.delete(email); // Limpia el código después de la validación.
    res.send('Registro exitoso.');
  } else {
    // Código inválido: deniega el registro.
    res.status(401).send('Código de verificación incorrecto.');
  }
});

app.listen(port, () => {
  console.log(`Aplicación en ejecución en http://localhost:${port}`);
});

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//     user: process.env.USER,
//     pass: process.env.APP_PASS,
//   },
// });

// transporter.verify().then(console.log).catch(console.error);

// transporter.sendMail({
//   from: `"App login" <${process.env.USER}>`, // sender address
//   to: "federico2797@gmail.com", // list of receivers
//   // to: "federico2797@gmail.com, receivertwo@outlook.com", // list of receivers
//   subject: "This is a test email @edigleyssonsilva ✔", // Subject line
//   text: "There is a new article. It's about sending emails, check it out!", // plain text body
//   html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
// }).then(info => {
//   console.log({info});
// }).catch(console.error);

