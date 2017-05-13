var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const segundo = (new Date()).getSeconds();
    
  res.render('index', { 
    title: 'Express',
    valor: '<script>alert("cuidado!")</script>',
    condicion: {
      segundo: segundo,
      estado: segundo % 2 === 0
    },
    users: [
      {name: 'Smith', age: 42},
      {name: 'Thomas', age: 20},
      {name: 'Jones', age: 32}
    ]
  });
});

// parámetros en la ruta
router.get('/paramenruta/:id', (req, res, next) => {
  console.log('req.params', req.params);
  res.send('ok, recibido el ID: ' + req.params.id);
});

router.get('/paramopcional/:dato?', (req, res, next) => {
  console.log('Param opcion: req.params', req.params);
  res.send('ok, recibido el dato');
});

router.get('/param/:id([0-9]+)/piso/:piso/puerta/:puerta(A|B|C)', (req, res, next) => {
  console.log('Varios params: ', req.params);
  res.send('OK, varios params');
});

// parámetros en la query string
router.get('/enquerystring', (req, res, next) => {
  console.log('req.query', req.query);
  res.send('Ok en query string');
});

// parámetros en el body (cuerpo de la petición)
router.put('/enelbody', (req, res, next) => {
  console.log('OK en el BODY: ', req.body);
  res.send('OK en el body');
});

module.exports = router;
