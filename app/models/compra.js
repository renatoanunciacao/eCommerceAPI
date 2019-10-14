const mongoose = require('mongoose');

const enumTipo = {
    values: ['PEDIDO REALIZADO', 'COBRANÇA', 'SEPARAÇÃO', 'TRANSPORTE'],
    message: 'Tipo `{VALUE}` não deferido'
}

const Schema = mongoose.Schema;

let SchemaCompra = new Schema(
    {
        total: Number,
        formaPagamento: String,
        data: Date,
        status: { type: String }

    },
    { strict: "throw"} 
);

SchemaCompra.path('status').enum(enumTipo).trim(true);

SchemaCompra.pre('save', function(next){
    if(!this.status){
        console.log('Não informou o status');
        this.status = enumTipo.values[0];
    }
    next();
});


const Compra = mongoose.model(
    "Compra",
    SchemaCompra,
    "compras"
);

module.exports = Compra;