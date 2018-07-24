
// Importo los errores
var error = require('../helpers/error');

// Importo el router
var express = require('express');

// Importo el servicio de autenticacion jwt
var authService = require('../services/auth');

// Creo el router para que herede los parámetros, si están definidos en la ruta
var router = express.Router({ mergeParams : true });

// Importamos el objeto User de mongoose
var User = require('../models/db').User;

// Obtenemos todos los usuarios
router.get('/', authService.authenticate(), function(req, res, next){

    // Obtenemos todos los usuarios
    User.find({}, function(err, data){

        // Si retorno error, lo pasamos
        if (err) return next(err);

        // Si no, retornamos toda la informacion
        res.status(200).json(data);
    });
});

// Obtenemos un usuario
router.get('/:id', authService.authenticate(), function(req, res, next){

    // Obtenemos un usuario con mongoose
    User.findById(req.params.id, function(err, user){

        // Si hay error, lo pasamos
        if (err) return next(err);

        // Si no hay usuario lo pasamos con error.NotFound
        if (!user) return next(error.NotFound('Usuario no encontrado'));

        // Si no retornamos el objeto usuario en json
        res.status(200).json(user);
    });
});

// Creamos un usuario
router.post('/', function(req, res, next){

    // Creamos el nuevo usuario con el mensaje json del body
    var user = new User(req.body);

    // Persistimos el usuario
    user.save(function(err, user){

        // Si hubo algun error lo pasamos al proxumo middleware
        if(err) return next(err);

        // Si no hubo error retornamos el usuario creado
        res.status(200).json(user);
    })
});

// Actualizamos un usuario
router.put('/:id', authService.authenticate(), function(req, res, next){

    // Obtenemos un usuario con mongoose por su id
    User.findById(req.params.id, function(err, user){

        // Si se produjo un error lo pasamos al siguiente mdlw
        if (err) return next(err);

        // Si no encontro el usuario retornamos error.NotFound
        if (!user) return next(error.NotFound('Usuario no encontrado'));

        // Si no, actualizamos el usuario
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.userName = req.body.userName;
        user.password = req.body.password;
        user.email = req.body.email;

        // Persistimos los cambios con mongoose
        user.save(function(err, data){

            // Si hubo un error, lo pasamos
            if (err) return next(err);

            // Si no, retornamos la respuesta
            res.status(200).json(data);
        });
    });
});

// Eliminamos un usuario
router.delete('/:id', authService.authenticate(), function(req, res, next){

    // Obtenemos un usuario con mongoose por su id
    User.findById(req.params.id, function(err, user){

        // Si hubo error, lo pasamos
        if (err) return next(err);

        // Si no pudo obtener el usuario
        if (!user) return next(error.NotFound('Usuario no encontrado'));

        // Si el usuario existe lo eliminamos con mongoose
        user.remove(function(err, data){

            // Si hubo un error lo pasamos
            if(err) return next(err);

            // Si no retornamos la respuesta
            res.status(200).json(data);
        });
    });
});


// Logueamos un usuario
router.post('/login', function(req, res, next){

    // Verificamos si existe el usuario
    User.findOne({ userName : req.body.userName}, function(err, user){

        // Si hubo error pasamos el request
        if (err) return next(err);

        // Si no retorno ningun usuario
        if (!user) return next(error.NotFound('Usuario no encontrado'));

        // Si el usuario existe
        user.comparePassword(req.body.password, function(err, match){

            // Si no coinciden
            if (!match) return next(error.NotFound('Usuario o contraseña incorrecta'));

            // Creamos el token para este user id con una duracion de 15 minutos
            var token = authService.getToken({ sub : user._id, username : user.userName }, '15m');

            // Retornamos el token
            res.status(200).json({ token : token });
        });
    });
});

// Exportamos el modulo router
module.exports = router;