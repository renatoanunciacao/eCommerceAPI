const mongoose = require('mongoose')
const CupomDesconto = require("./../models/cupomDesconto");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    listarTudo: function(req, res) {
        CupomDesconto.find(function(error, cupons) {
          if (error) {
            res.send("Erro ao tentar recuperar os cupons de desconto" + error);
          } else {
            res.json(cupons);
          }
        });
      },
    adicionar: function(req, res) {
        let cupomDesconto = new CupomDesconto();
        cupomDesconto.dataInicial = req.body.dataInicial;
        cupomDesconto.dataFinal = req.body.dataFinal;
        cupomDesconto.valorInicial = req.body.valorInicial;
        cupomDesconto.valorFinal = req.body.valorFinal;
        cupomDesconto.quantidadeCupons = req.body.quantidadeCupons;
        cupomDesconto.quantidadeUsada = req.body.quantidadeUsada;
        cupomDesconto.percentualDesconto = req.body.percentualDesconto;
  
        cupomDesconto.save(function(error) {
          if (error) {
            res.send("Erro ao gravar Cupom de Desconto" + error);
          }
          res.json({ message: "Cupom de desconto cadastrado!" });
        });
      },
    listarUm: function(req, res) {
        CupomDesconto.findById(ObjectId(req.params.cupons_id), function(
          error,
          cupomDesconto
        ) {
          if (error) {
            res.send("Erro ao recuperar cupom de Desconto " + error);
          } else if (cupomDesconto) {
            res.json(cupomDesconto);
          } else {
            res.json({
              message: "Id do Cupom não encontrado",
              id: req.params.cupons_id
            });
          }
        });
      },
    alterar: function(req, res) {
        // recupera o objeto para alterar
        CupomDesconto.findById(ObjectId(req.params.cupons_id), function(
          error,
          cupomDesconto
        ) {
          if (error) {
            res.send("Cupom não encontrado");
          } else if (cupomDesconto) {
            // já posso alterar meu cupom de desconto
            if (req.body.dataInicial) {
              cupomDesconto.dataInicial = req.body.dataInicial;
            }
            if (req.body.dataFinal) {
              cupomDesconto.dataFinal = req.body.dataFinal;
            }
            if (req.body.valorInicial) {
              cupomDesconto.valorInicial = req.body.valorInicial;
            }
            if (req.body.quantidadeCupons) {
              cupomDesconto.quantidadeCupons = req.body.quantidadeCupons;
            }
            if (req.body.valorFinal) {
              cupomDesconto.valorFinal = req.body.valorFinal;
            }
            if (req.body.percentualDesconto) {
              cupomDesconto.percentualDesconto = req.body.percentualDesconto;
            }
            if (req.body.quantidadeUsada) {
              cupomDesconto.quantidadeUsada = req.body.quantidadeUsada;
            }
            //persistir na base de dados
            cupomDesconto.save(function(error) {
              if (error) {
                res.send("Erro ao gravar o cupom" + error);
              }
              res.json({ message: "Cupom atualizado com sucesso!" });
            });
          } else {
            res.json({
              message: "Id do Cupom não encontrado",
              id: req.params.cupons_id
            });
          }
        });
      },
    excluir: function(req, res) {
        let id = req.params.cupons_id;
        CupomDesconto.deleteOne({ _id: ObjectId(id) }, function(error, result) {
          if (error) {
            res.send("Erro ao excluir cupom de desconto" + error);
          } else if (result.n === 0) {
            res.json({ message: "O cupom informado não existe" });
          } else {
            console.log("resultado", result);
            res.json({ message: "Cupom excluido com sucesso!" });
          }
        });
      },
    alterarParcial: function(req, res) {
        let id = req.params.cupons_id;
        let cupomDesconto = req.body;
        CupomDesconto.updateOne(
          { _id: ObjectId(id) },
          { $set: cupomDesconto },
          function(error) {
            if (error) {
              res, send("Erro ao alterar cupom parcial " + error);
            } else {
              res.json({ message: "Cupom de desconto atualizado!" });
            }
          });
      }
}