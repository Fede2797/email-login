require('dotenv').config();

const Server = require('./models/server');

const server = new Server();
 
server.listen();

// Ruta de validación del código de verificación.
// app.post('/confirmsignup', (req, res) => {
//   const { email, codigo } = req.body;

//   // Obtiene el código de verificación almacenado para el correo electrónico.
//   const storedCode = verificationCodes.get(email);

//   if (storedCode && Number(codigo) === storedCode) {
//     // Código válido: permite el registro.
//     verificationCodes.delete(email); // Limpia el código después de la validación.
//     res.send('Registro exitoso.');
//   } else {
//     // Código inválido: deniega el registro.
//     res.status(401).send('Código de verificación incorrecto.');
//   }
// });
