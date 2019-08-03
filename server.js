const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require('body-parser');

const Usuario = require("./app/models/user");
const CupomDesconto = require("./app/models/cupomDesconto");

const port = 3000;

mongoose.connect(
  "mongodb+srv://usermongo:C0nnect123@cluster0-povns.mongodb.net/ecommerce?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyparser.urlencoded({extended: true}));
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
      res.send("Erro ao tentar recuperar os usuários"+ error);
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

  cupomDesconto.save(function(error){
      if(error){
          res.send('Erro ao gravar Cupom de Desconto'+ error);
      }
      res.json({message: 'Cupom de desconto cadastrado!'});
  })
});

app.get('/cupom', function(req, res){
    CupomDesconto.find(function(error, cupons){
        if(error){
            res.send("Erro ao tentar recuperar os cupons de desconto" + error);
        }else{
            res.json(cupons);
        }
    })
})

app.listen(port, function(req, res) {
  console.log(`Server running on port ${port}`);
});
