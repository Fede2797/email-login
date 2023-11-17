require('dotenv').config();

const Server = require('./models/server');

const server = new Server();
 
server.listen();

// Ingresar email para signup
// Ingresar codigo para finalizar signup
// Ingresar email para log in
// Ingresar codigo para finalizar log in
