// Importamos passport
var passport = require('passport');

// Importamos la estrategia de passport
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// Importamos los errores
var error = require('../helpers/error');


// Importamos Json Web Token
var jwt = require('jsonwebtoken');

// Creamos objeto de opciones
var opts = {};

// Funcion que inicializa passport
exports.configure = function(secretPhrase, UserModel){

    // Configuramos las opciones
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secretPhrase;
    
    // Creamos la nueva estrategia con las opciones
    var strategy = new JwtStrategy(opts, function(jwt_payload, done){

        // Obtenemos el usuario por su id con mongoose
        UserModel.findOne({ _id : jwt_payload.sub }, function(err, user){

            // Si hubo error lo retornamos
            if (err) return done(err, false);

            // Si hubo un usuario lo retornamos
            if (user) return done(null, user);

            // Si no retornamos null y false
            done(null, false);
        });
    });

    // Seteamos la estrategia en passport
    passport.use(strategy);

    // Inicializamos y retornamos
    return passport.initialize();
};

// Retorna un token de los datos y el tiempo de expiracion
exports.getToken = function(data, expire){
    return jwt.sign(data, opts.secretOrKey, { expiresIn : expire });
};

exports.authenticate = function(req, res, next){
    return passport.authenticate('jwt', { session : false });
};