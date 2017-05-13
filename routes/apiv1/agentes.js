"use stric";

var express = require('express');
var router = express.Router();
const basicAuth = require('../../lib/basicAuth');

// no seria necesario requerir el modulo de Agente
// ya que podríamos recuperar el modelo con: 
// const mongoose = require('mongoose')
// mongoose.model('Agente')
const Agente = require('../../models/Agente');

//router.use(basicAuth);

/* GET /apiv1/agentes */
router.get('/', basicAuth, function(req, res, next) {
    const name = req.query.name;
    const age = req.query.age;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;


    // creamos el filtro vacio
    const filter = {};
    if(name){
        filter.name = name;
    }
    if(age){
        filter.age = age;
    }

    Agente.list(filter, limit, skip, fields, sort, (err, agentes) => {
        if(err){
            next(err); // le decimos a express que devuelva el error
            return;
        }

        res.json({success: true, result: agentes});

    });

});


// POST /apiv1/agentes
router.post('/', (req, res, next) => {
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    // Las validaciones de minimos y maximos, usar mongoose.

    // creamos un objecto de tipo Agente con la peticion mandada
    const agente = new Agente(req.body);

    // lo guardamos en la BD
    agente.save((err, agenteCreado) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, result: agenteCreado});
    });



});



module.exports = router;