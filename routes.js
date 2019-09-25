const cupomDescontoCon = require("./app/controllers/cupomdesconto");
const produtoCon = require("./app/controllers/produto");
const usuarioCon = require("./app/controllers/usuario");
const validadorToken = require("./app/utils/authJWT").validadorDeToken;

module.exports = function(ecommerceRouter, passport) {
  // Rotas que terminam com /cupons (serve: POST e GET ALL)
  ecommerceRouter
    .route("/cupons")
    // Função cadastrar cupom: POST
    .post(cupomDescontoCon.adicionar)
    // Função GET cupons
    .get(cupomDescontoCon.listarTudo);
  // Rotas que terminarem com /cupons/:cupons_id(GET, PUT, PATCH, DELETE)
  ecommerceRouter
    .route("/cupons/:cupons_id")
    .get(cupomDescontoCon.listarUm)
    .put(cupomDescontoCon.alterar)
    // Alteração de um objeto parcialmente
    .patch(cupomDescontoCon.alterarParcial)
    // excluir cupom de desconto
    .delete(cupomDescontoCon.excluir);

  ecommerceRouter
    .route("/produtos")
    .post(produtoCon.adicionar)
    .get(produtoCon.listarTudo);
  // Rotas que terminarem com /produtos/:produto_id(GET, PUT, PATCH, DELETE)
  ecommerceRouter
    .route("/produtos/:produto_id")
    .get(produtoCon.listarUm)
    .put(produtoCon.alterar)
    .patch(produtoCon.alterarParcial)
    .delete(produtoCon.excluir);

  /**
   *
   * Usuario
   */
  ecommerceRouter
    .route("/usuarios")
    .post(usuarioCon.adicionar)
    .get(validadorToken, usuarioCon.listarTodos);

  ecommerceRouter.route("/login").post(usuarioCon.login);

  /**
   * OAuth
   */

  ecommerceRouter
    .route("/auth/google")
    .get(
      passport.authenticate("google", {
        scope: ["https://www.googleapis.com/auth/userinfo.profile"]
      })
    );

  ecommerceRouter
    .route("/auth/google/callback")
    .get(passport.authenticate("google", { failRedirect: "/" }),
     function(req, res) {
      res.json({
        token: "Aquivamos vamos mostrar o token"
      });
    });

  return ecommerceRouter;
};
