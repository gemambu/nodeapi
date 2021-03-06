const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Establecemos la conexión de base de datos
require('./lib/connectMongoose');
require('./models/Agente');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'otropublic')));

app.use((req, res, next) => {
  console.log('Soy un middleware, y estoy evaluando la petición ', req.originalUrl);
  // en express cada middleware tiene que responder:
  //    res.send('soy un middleware!');
  //... o llamar a next();
      next();
  //... o lamar a next con error: 
  //    next(new Error('Esto va mal'));
});

// Rutas de nuestra aplicación
app.use('/',              require('./routes/index'));
app.use('/apiv1/agentes', require('./routes/apiv1/agentes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  
  res.status(err.status || 500);
  
  if(isAPI(req)){
    res.json({success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
 return req.originalUrl.indexOf('/apiv') === 0; 
}
module.exports = app;
