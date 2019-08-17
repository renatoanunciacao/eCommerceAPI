const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaProduto = new Schema({
    nomeProduto: String,
    precoProduto: Number,
    descricaoProduto: String,
    quantidadeEstoqueProduto: {
        type: Number,
        required: [true, 'A quantidade de Produtos no estoque é obrigatória']
    }
});

const Produto = mongoose.model('Produto', schemaProduto, 'produtos')

module.exports = Produto;