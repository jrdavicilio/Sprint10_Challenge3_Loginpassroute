// Snippets de código para poder componer el programa

//Usado?: YES
  const middlewares = require('./middlewares');
//--- Explicación: Se importan los middlewares en app.js

// -------------------------------------------------------------------------------------

//Usado?: YES 
const bodyParser = require('body-parser');
//--- Explicación: Se importa body-parser en middlewares.js para poder leer los datos de los formularios enviados por post

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: Se importa express para gestionar las sesiones de usuario en middlewares.js

// -------------------------------------------------------------------------------------

//Usado?: YES
const express = require('express');
//--- Explicación: Se inicializa express en app.js

// -------------------------------------------------------------------------------------

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: Se importa body-parser en app.js para poder leer los datos de los formularios enviados por post

// -------------------------------------------------------------------------------------

//Usado?: YES 
const session = require('express-session');
//--- Explicación: Se importa express para gestionar las sesiones de usuario en app.js

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: Se importa dotenv en routes.js para poder leer los .env

// -------------------------------------------------------------------------------------

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: Se importan los middlewares en routes.js

// -------------------------------------------------------------------------------------

//Usado?: YES
const routes = require('./routes');
//--- Explicación: Se importan las rutas en app.js

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: Se cargan las variables .env y se añaden en process.env en app.js

// -------------------------------------------------------------------------------------

//Usado?: YES
const app = express();
//--- Explicación: Se ejecuta express en app.js

// -------------------------------------------------------------------------------------

//Usado?: YES
const PORT = 4000;
//--- Explicación: Se selecciona el puerto donde se inicializará el servidor

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: Se importa dotenv en app.js para poder leer los .env

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: Se cargan las variables .env y se añaden en process.env en routes.js

// -------------------------------------------------------------------------------------

//Usado?: YES
middlewares.setupApp(app);
//--- Explicación: Se ejecuta la función setupApp para aplicar la configuración general de sesiones y body-parser

// -------------------------------------------------------------------------------------

//Usado?: YES
routes.setup(app);
//--- Explicación: Se ejecuta la función setup de routes para definir las rutas de la aplicación en Express

// -------------------------------------------------------------------------------------

//Usado?: YES
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Es un middleware que valida si la palabra enviada por el usuario coincide con la clave secreta, y si es así, la guarda en sesión


// -------------------------------------------------------------------------------------


//Usado?: YES
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: Define la ruta get de inicio ('/'), y establece la lógica de tal forma que si se acierta la palabra Secreta redirige a una nueva página y en caso contrario saltara un tipo de error u otro


// -------------------------------------------------------------------------------------


//Usado?: YES
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: Dentro de la función setup construye el html básico de la Home y muestra un formulario


// -------------------------------------------------------------------------------------

//Usado?: YES
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: Es una función que configura los middlewares body-parser y session


// -------------------------------------------------------------------------------------

//Usado?: YES
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Es una ruta post que valida la palabra secreta antes de mostrar la página del perfil

// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación:  Es un middleware que permite analizar datos codificados en URL del formulario

// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: Es un middleware que configura las sesiones con una clave secreta

// -------------------------------------------------------------------------------------

//Usado?: YES
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Se selecciona el puerto en el que se va a inicializar el servidor y a su vez creamos un enlace para poder acceder al mismo

// -------------------------------------------------------------------------------------

//Usado?: YES
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Es un middleware que comprueba si existe una sesión activa con la palabra secreta antes de acceder a rutas protegidas

// -------------------------------------------------------------------------------------


//Usado?: YES
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Es un middleware que comprueba si existe una sesión activa con la palabra secreta antes de acceder a rutas protegidas

// -------------------------------------------------------------------------------------


//Usado?: YES
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Es una ruta que elimina la sesión actual y redirige al usuario a la página de inicio.


// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  setup,
};
//--- Explicación: Se exporta setup

// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Se exportan los middleware y el setupAPP

// -------------------------------------------------------------------------------------

