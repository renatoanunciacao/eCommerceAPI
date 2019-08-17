const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const Usuario = require("./app/models/user");
const CupomDesconto = require("./app/models/cupomDesconto");
const ObjectId = mongoose.Types.ObjectId;

const port = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://usermongo:C0nnect123@cluster0-povns.mongodb.net/ecommerce?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//Middleware. Toda a requisição passara aqui.
app.use(function(req, res, next) {
  console.log("Algo está acontecendo aqui.", req.url);
  //garante que o próximo comando seja executado.
  next();
});

app.get("/", function(req, res) {
  res.send("Bem vindo a nossa loja virtual");
});

app.get("/usuarios", function(req, res) {
  // obter os usuarios cadastrados no MongoDB
  Usuario.find(function(error, users) {
    if (error) {
      res.send("Erro ao tentar recuperar os usuários" + error);
    } else {
      res.json(users);
    }
  });
});

app.post("/cupons", function(req, res) {
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
});

app.get("/cupons", function(req, res) {
  CupomDesconto.find(function(error, cupons) {
    if (error) {
      res.send("Erro ao tentar recuperar os cupons de desconto" + error);
    } else {
      res.json(cupons);
    }
  });
});

app.get("/cupons/:cupons_id", function(req, res) {
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
});

app.put("/cupons/:cupons_id", function(req, res) {
  // recupera o o bjeto para alterar
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
});

// Alteração de um objeto parcialmente

app.patch("/cupons/:cupons_id", function(req, res) {
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
    }
  );
});

// excluir cupom de desconto
app.delete("/cupons/:cupons_id", function(req, res) {
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
});

app.listen(port, function(req, res) {
  console.log(`Server running on port ${port}`);
});
