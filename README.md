# node-server

### Descripción
API creada con express para autenticar usuarios utilizando JWT y Passport

##### Descargamos las dependencias:
```
npm install --save
```
##### Ejecutamos:
```
node index
```



## Rutas

**GET /users**
Obtiene todos los usuarios

**GET /users:id**
Obtiene un usuario

**POST /users**
Crea un usuario

**PUT /users:id**
Modifica un usuario

**POST /users/login**
Obtiene el token para autenticar

## Postman
Pordemos importar el archivo **node-server.postman_collection.json** para poder probar la API
