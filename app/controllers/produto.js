const mongoose = require("mongoose");
const Produto = require("./../models/produto");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  listarTudo: function(req, res) {
    Produto.find(function(error, produtos) {
      if (error) {
        res.send("Erro ao tentar recuperar os produtos" + error);
      } else {
        res.status(200).json(produtos);
      }
    });
  },
  adicionar: function(req, res) {
    let produto;
    try {
      produto = new Produto(req.body);
    } catch (e) {
      res.status(400).json(e);
      return;
    }
    /* produto.nomeProduto = req.body.nomeProduto;
        produto.precoProduto = req.body.precoProduto;
        produto.descricaoProduto = req.body.descricaoProduto;
        produto.quantidadeEstoqueProduto = req.body.quantidadeEstoqueProduto;*/
        const error = produto.validateSync();
        if(error){
          console.log('Mongoose Validation identificou problemas ao tentar salvar produto');
          res.status(400).json(error);
          return;
        }
    produto.save(function(error) {
      if (error) {
        res.send("Erro ao cadastrar o produto" + error);
        res.statusCode = 500;
        res.json(error);
      }
      res.status(201).json({ message: "Produto cadastrado com sucesso" });
    });
  },
  listarUm: function(req, res) {
    Produto.findById(ObjectId(req.params.produto_id), function(error, Produto) {
      if (error) {
        res.send("Erro ao recuperar o Produto " + error);
      } else if (Produto) {
        res.status(200).json(Produto);
      } else {
        res.json({
          message: "Id do Produto não encontrado",
          id: req.params.produto_id
        });
      }
    });
  },
  alterar: function(req, res) {
    // recupera o o bjeto para alterar
    Produto.findById(ObjectId(req.params.produto_id), function(error, produto) {
      if (error) {
        res.send("Cupom não encontrado");
      } else if (produto) {
        // já posso alterar meu cupom de desconto
        if (req.body.nomeProduto) {
          produto.nomeProduto = req.body.nomeProduto;
        }
        if (req.body.precoProduto) {
          produto.precoProduto = req.body.precoProduto;
        }
        if (req.body.descricaoProduto) {
          produto.descricaoProduto = req.body.descricaoProduto;
        }
        if (req.body.quantidadeEstoqueProduto) {
          produto.quantidadeEstoqueProduto = req.body.quantidadeEstoqueProduto;
        }

        //persistir na base de dados
        produto.save(function(error) {
          if (error) {
            res.send("Erro ao gravar o produto" + error);
          }
          res.status().json({ message: "Produto atualizado com sucesso!" });
        });
      } else {
        res.json({
          message: "Id do Produto não encontrado",
          id: req.params.cupons_id
        });
      }
    });
  },
  excluir: function(req, res) {
    let id = req.params.produto_id;
    Produto.deleteOne({ _id: ObjectId(id) }, function(error, result) {
      if (error) {
        res.send("Erro ao excluir produto" + error);
      } else if (result.n === 0) {
        res.json({ message: "O produto informado não existe" });
      } else {
        console.log("resultado", result);
        res.json({ message: "Produto excluido com sucesso!" });
      }
    });
  },
  alterarParcial: function(req, res) {
    let id = req.params.produto_id;
    let produto = req.body;
    Produto.updateOne({ _id: ObjectId(id) }, { $set: produto }, function(
      error
    ) {
      if (error) {
        res, send("Erro ao alterar produto parcial " + error);
      } else {
        res.json({ message: "Produto atualizado!" });
      }
    });
  }
};
