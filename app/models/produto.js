const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaProduto = new Schema({
  nomeProduto: { type: String, maxlength: 60, minlength: 3 },
  precoProduto: { type: Number, min: 0 },
  descricaoProduto: { type: String, maxlength: 200 },
  quantidadeEstoqueProduto: {
    type: Number,
    default: 0
    // required: [true, 'A quantidade de Produtos no estoque é obrigatória']
  }
});

const Produto = mongoose.model("Produto", schemaProduto, "produtos");

module.exports = Produto;
