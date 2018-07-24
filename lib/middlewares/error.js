
// Maneja los errores de cliente
exports.ClientErrorHandler = function(err, req, res, next){
    console.log(err.message);

    // Si no hay status o es 500, se lo pasamos al proximo mdlw
    if (!err.status || err.status == 500) return next(err);
    
    // Si no retornamos el mensaje
    return res.status(err.status).json({ message : err.message });
};

// Maneja los errores de servidor
exports.ServerErrorHandler = function (err, req, res, next){

    // Retornamos el mensaje o Error interno
    var msg = err.message || 'Error interno del servidor';
    console.log(msg);
    return res.status(500).json({ message : msg });
};