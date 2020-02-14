module.exports = {
    index(req, res) {
        res.redirect('/api/litter/new');
    },
    login(req, res) {
        res.render('index/login');
    },
    logout(req, res){
        req.session.loggedIn = false;
        res.redirect('/login');
    }
}