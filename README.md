# Social Treek Backend

El backend de **Social Treek** es una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB**. Esta API permite gestionar usuarios, autenticación y redes sociales asociadas a cada usuario. Es el núcleo de la plataforma **Social Treek**, que permite a los usuarios compartir sus redes sociales de manera rápida y sencilla.

## Características

- **Autenticación de usuarios**: Registro e inicio de sesión con nombre de usuario y contraseña.
- **Gestión de redes sociales**: Los usuarios pueden agregar, editar y eliminar sus redes sociales.
- **Perfil de usuario**: Los usuarios pueden actualizar su foto de perfil, fondo de perfil y biografía.
- **Validación de tokens JWT**: Seguridad mediante tokens JWT para proteger las rutas.
- **Manejo de errores**: Validación de datos y manejo de errores en las solicitudes.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir aplicaciones web y APIs.
- **MongoDB**: Base de datos NoSQL para almacenar datos.
- **Mongoose**: Librería para modelar objetos de MongoDB.
- **JWT (JSON Web Tokens)**: Para autenticación y autorización.
- **Bcrypt**: Para el hash de contraseñas.
- **Express Validator**: Para validar los datos de entrada en las solicitudes.
- **CORS**: Para permitir solicitudes cruzadas entre el frontend y el backend.

## Estructura del proyecto
	carloscarrete-backend-tree/
	├── index.js
	├── package.json
	├── .env-example
	├── controllers/
	│   ├── auth.controller.js
	│   └── network.controller.js
	├── database/
	│   └── connection.js
	├── middleware/
	│   ├── validateJwt.js
	│   └── validator.js
	├── models/
	│   ├── SocialNetwork.js
	│   └── User.js
	├── requests/
	│   ├── create_social_network.rest
	│   ├── delete_social_network.rest
	│   ├── get_all_social_networks.rest
	│   ├── get_all_users.rest
	│   ├── get_socialNetwork_byUser.rest
	│   ├── get_userByName.rest
	│   ├── login.rest
	│   ├── register.rest
	│   ├── renew-token.rest
	│   ├── update_social_network.rest
	│   └── updateProfilePicture.rest
	├── routes/
	│   ├── auth.routes.js
	│   └── network.routes.js
	└── utils/
	    └── generateToken.js

## Instalación

1.  Clona el repositorio:
    
	    git clone https://github.com/carloscarrete/backend-tree.git
    
2.  Navega al directorio del proyecto:

	    cd carloscarrete-backend-tree
    
3.  Instala las dependencias:

	    npm install
    
4.  Crea un archivo  `.env`  en la raíz del proyecto y añade tus variables de entorno:
        
	    URL_MONGO=tu_url_de_mongodb
	    PORT=3000
	    JWT_SECRET=tu_clave_secreta_jwt
    
5.  Inicia el servidor de desarrollo:
   
   
	    npm run dev
    
6.  El servidor estará corriendo en  `http://localhost:3000`. 
## Endpoints
### Autenticación
-   **Registro de usuario**:  `POST /api/v1/auth/register`   
-   **Inicio de sesión**:  `POST /api/v1/auth/login`   
-   **Renovación de token**:  `GET /api/v1/auth/renew-token`  
-   **Obtener información de un usuario**:  `GET /api/v1/auth/:username`    
-   **Actualizar información del perfil**:  `PUT /api/v1/auth/image/profile`
### Redes Sociales
-   **Obtener todas las redes sociales**:  `GET /api/v1/networks`    
-   **Crear una red social**:  `POST /api/v1/networks`    
-   **Eliminar una red social**:  `DELETE /api/v1/networks/:id`    
-   **Actualizar una red social**:  `PUT /api/v1/networks/:id`    
-   **Obtener redes sociales de un usuario**:  `GET /api/v1/networks/user/:username`
## Ejemplos de solicitudes

### Registro de usuario

	POST /api/v1/auth/register
	Content-Type: application/json
	 {
	    "username": "maria",
	    "email": "maria@gmail.com",
	    "password": "maria123",
	    "confirmPassword": "maria123"
	}

### Inicio de sesión
	POST /api/v1/auth/login
	Content-Type: application/json
	 {
	    "username": "maria",
	    "password": "maria123"
	}

### Crear una red social
	POST /api/v1/networks
	Content-Type: application/json
	Authorization: Bearer <token>
	 {
	    "name": "Twitter",
	    "url": "https://twitter.com/carloskrt"
	}

### Eliminar una red social
	DELETE /api/v1/networks/62ecadecca9242f4ca719cf8
	Authorization: Bearer <token>
## Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:
1.  Haz un fork del repositorio.   
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).    
3.  Realiza tus cambios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).    
4.  Haz push a la rama (`git push origin feature/nueva-funcionalidad`). 
5.  Abre un Pull Request.
## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo  [LICENSE](https://license/)  para más detalles.