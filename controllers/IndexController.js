module.exports = {
    index(req, res) {
        res.redirect('/api/litter/new');
    },
    login(req, res) {
        res.render('index/login');
    }
}