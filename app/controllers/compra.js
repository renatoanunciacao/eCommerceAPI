const mongoose = require("mongoose");
const Compra = require("./../models/compra");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  listarTudo: function(req, res) {
    Compra.find(function(error, compras) {
      if (error) {
        res.send("Erro ao tentar recuperar as compras" + error);
      } else {
        res.status(200).json(compras);
      }
    });
  },
  adicionar: function(req, res) {
    let compra;
    try {
      compra = new Compra(req.body);
    } catch (error) {
      res.status(400).json(error);
      return;
    }
    const error = compra.validateSync();
    if (error) {
      res.status(400).json(error);
      return;
    }
    compra.save(function(error) {
      if (error) {
        res.send("Erro ao cadastar a compra" + error);
        res.status(500).json(error);
      }
      res.status(201).json({ message: "Compra cadastrada com sucesso" });
    });
  },

  listarUm: function(req, res) {
    // obter um Produto cadastrado no MongoDB
    Compra.findById(req.params.compra_id, function(err, compra) {
      if (err) {
        res.send("Erro ao recuperar Compra pelo id.", err);
      } else if (compra) {
        res.json(compra);
      } else {
        res.json({
          message: "Id da Compra não localizado.",
          id: req.params.compra_id
        });
      }
    });
  },
  alterar: function(req, res){
    Compra.findById(req.params.compra_id, function (error, compra) {
      if (error) {
          res.send('Erro ao recuperar Compra pelo identificador informado.', error);
      } else if (compra){
          compra.total = req.body.total;
          compra.formaPagamento = req.body.formaPagamento;
          compra.data = req.body.data;
          compra.status = req.body.status;

          // tratando a resposta na function
          compra.save(function(error) {
          if (error) {
              res.send('Erro ao tentar gravar o Compra...: ' + error);
              }
              res.json({ message: 'Compra atualizado com Sucesso!'});
          });
      } else {
          res.json({  
              message:'Id da Compra não localizada.',
              id: req.params.compra_id
          });
      }
  });
  }
};
