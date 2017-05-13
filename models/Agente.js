"use strict";

const mongoose = require('mongoose');

// primero definimos un esquema
const agenteSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        index: true,
        unique: true
    },
    dateOfBirth: Date
});

// Creamos un metodo estatico
agenteSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Agente.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields); // {nombreCampo: 1, campoquenoquiero: 0}
    query.sort(sort);

    query.exec(callback);
};

// después creamos el modelo
var Agente = mongoose.model('Agente', agenteSchema);

// Exportar el modelo, pero no es necesario
// porque en otros sitios podemos recuperar el modelo
// usando: mongoose.model('Agente')
module.exports = Agente;

