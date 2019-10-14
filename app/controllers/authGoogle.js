module.exports = {
    retornoAutenticacao:  function(req, res){
        req.session.token = req.user.token;
        console.log('user ',req.user);
        res.json( {
            token: req.session.token,
            name: req.user.profile.displayName,
            email: req.user.profile.emails
        });
    },
    validate: function(req, res, next){
        if(req.session.token){
            res.cookie('token', req.session.token);
            console.log('cookie de sessão setado');
            next();
        }else{
            res.cookie('token', '');
            console.log('cookie de sessão não setado');
            res.redirect('/ecommerce/auth/google')
        }
    },
    logout: function(req, res){
        req.logout();
        req.session = null;
        res.redirect('/');
    }
};