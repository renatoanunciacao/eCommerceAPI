const mongoose = require('mongoose');

const schemaUsuario = mongoose.Schema(
    {
        nome: String,
        email: String
    }
);

//Criar um Modelo
const Usuario = mongoose.model('Usuario', schemaUsuario, 'usuario');

module.exports = Usuario;