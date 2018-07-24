// Importamos mongoose
var mongoose = require('mongoose');

// Creamos el esquema
var userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    userName : {
      type: String,
      required: true
    },

    password : {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    createdOn: {
      type: Date,
      default: Date.now
    }
});

// Importamos la lib bcrypt
var bcrypt = require('bcryptjs');

// Antes de que se ejecute save realizamos lo siguiente
userSchema.pre('save', function(next){

    // Asignamos el usuario
    var user = this;

    // Si el password fue modificado o el usuario es nuevo
    if (user.isModified('password') || user.isNew){

        // Generamos el salt 10 veces
        bcrypt.genSalt(10, function(err, salt){

            // Si hubo error, se lo pasamos al proximo mdlw
            if (err) return next(err);

            // Si no hubo error generamos el hash con el pass
            bcrypt.hash(user.password, salt, function(err, hash){

                // Si hubo error, lo pasamos
                if(err) return next(err);

                // Si no hubo error asignamos y continuamos
                user.password = hash;
                next();
            }); 
        });
    }

    // Si el pass no fue modificado o el user no es nuevo
    else {
        return next();
    }
});

// Creamos un metodo en el esquema usuario para comparar el password cifrado
userSchema.methods.comparePassword = function(password, callback){

    // Comparamos el pass 
    bcrypt.compare(password, this.password, function(err, isMatch){

        // Si hubo un error
        if(err) return callback(err);

        // Si no hubo es que coincidio. Lo retornamos
        callback(null, isMatch);
    });
};

// Exportamos el Usuario
module.exports = mongoose.model('User', userSchema);