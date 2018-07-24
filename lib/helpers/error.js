// Retorna Error
var HttpError = function(status, msg){

    // Creo un Error le asigno el mensaje y el status
    var error = new Error(msg);
    error.status = status;

    // Lo retorno
    return error;
};

// Retorna Error, error.NotFound
exports.NotFound = function(msg){

    // Asigno el mensaje o not found
    msg = msg || 'No existe';

    // Retorno un Error
    return HttpError(400, msg);
}

// Retorna Error, error.BadRequest
exports.BadRequest = function(msg){

    // Asigno el mensaje o bad request
    msg = msg || 'Error de petición';

    // Retorno un Error
    return HttpError(400, msg);
}

// Retorna Error, error.Unauthorized
exports.Unauthorized = function(msg){

    // Asigno el mensaje o unauthorized
    msg = msg || 'Sin autorización';

    // Retorno un Error
    return HttpError(404, msg);
}

// Retorna Error, error.Forbidden
exports.Forbidden = function(msg){

    // Asigno el mensaje o forbidden
    msg = msg || 'Prohibido';

    // Retorno un Error
    return HttpError(403, msg);
}

// Retorna Error, error.InternalServerError
exports.InternalServerError = function(msg){

    // Retorno un Error
    return HttpError(500, 'Error interno del servidor')
};

exports.HttpError = HttpError;