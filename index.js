// Cargamos la configuracion de la  base
var db = require('./lib/models/db');

// Creamos la aplicacion express
var express = require('express');
var app = express();

// Parseamos el body en json y lo agregamos en el request 
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Seteamos passport con Json Web Token
var authService = require('./lib/services/auth');
app.use(authService.configure('Palabra Secreta', db.User));

// Cargamos las rutas de usuarios
var userRouter = require('./lib/routes/user');
app.use('/users', userRouter);

// Creamos la ruta raiz
app.get('/',function(req, res){
     
    // Retornamos json con mensaje
    res.json({ message : 'webapi server' });
});

// Para todas las rutas que no existen creamos middleware que retorna error.NotFound
var error = require('./lib/helpers/error');
app.get('*', function(req, res, next){
    next(error.NotFound('Recurso no existe'));
});

// Middleware para manejar los errores de cliente o de servidor
var errorHandler = require('./lib/middlewares/error');
app.use(errorHandler.ClientErrorHandler);
app.use(errorHandler.ServerErrorHandler);

// Creamos una instancia del servidor corriendo en el puerto 3000
var server = app.listen(3000, function(){
    console.log('Servidor corriendo en: http://localhost:' + server.address().port);
});
