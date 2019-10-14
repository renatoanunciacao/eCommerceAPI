const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
   // Tipos Aceitáveis: String, Number, Boolean, Date, Array, ObjectId 
   nomeProduto: {
      type: String,
      required: [true, '`{PATH}` é obrigatório.'],
      minlength: [3, '`{PATH}` muito curto.'],
      maxlength: [60, 'Excedeu o limite do campo `{PATH}` que é de `{MAXLENGTH}`.']
   },
   precoProduto: {
      type: Number,
      min: [0, '`{PATH}` deve ser maior ou igual a `{MIN}`.']
   },
   descricaoProduto: {
      type: String,
      maxlength: [200, 'Excedeu o limite do campo `{PATH}` que é de `{MAXLENGTH}`.']
   },
   quantidadeEstoqueProduto: {
      type: Number,
      default: 0 
   }
});
module.exports = mongoose.model('Produto', produtoSchema, 'produtos');