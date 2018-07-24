// Importamos mongoose
var mongoose = require('mongoose');

// Construimos la cadena de conexion
var port = 27017;
var dbURI = 'mongodb://localhost:' + port + '/webapi';

// Creamos la coneccion con la base de datos
mongoose.connect(dbURI, { useNewUrlParser: true });

// Maneja varios eventos de la base de datos
mongoose.connection.on('connected', function () {
    console.log('Mongoose se conectó a: ', dbURI);
});

// En error de la base
mongoose.connection.on('error', function (err) {
    console.log('Mongoose error de conexión: ', err);
});

// En desconexion
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose se desconectó');
});

// Manejamos procesos de terminacion inesperada
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose se desconectó debido a que la aplicación terminó inesperadamente');
        process.exit(0);
    });
});

// Cargamos y exportamos todos los modulos de mongoose
exports.User = require('./user');