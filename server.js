const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const ecommerceRouter = express.Router();
const hateoasLink = require('express-hateoas-links');

const routes = require('./routes');

const Usuario = require("./app/models/user");

const port = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://usermongo:C0nnect123@cluster0-povns.mongodb.net/ecommerce?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// setar o uso do módulo hateoas
app.use(hateoasLink);
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

app.use("/ecommerce", routes(ecommerceRouter));
app.listen(port, function(req, res) {
  console.log(`Server running on port ${port}`);
});
