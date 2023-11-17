const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT

    this.paths = {
        signup:         '/api/signup',
        confirmsignup:  '/api/confirmsignup',
        login:          '/api/login',
        confirmlogin:   '/api/confirmlogin',
    }

    // Conecct DB
    this.connectDB();

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use( cors() );

    // Body parser
    this.app.use( express.json() );
  }

  routes() {
    this.app.use( this.paths.signup, require("../routes/signup") );
    this.app.use( this.paths.login, require("../routes/login") );
  }

  listen() {
    this.app.listen( this.port, () => {
        console.log(`Server running on PORT ${ this.port }`);
    });
  }

}

module.exports = Server