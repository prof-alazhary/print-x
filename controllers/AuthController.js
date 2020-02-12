const AuthService = require('../services/AuthService');

module.exports = {
    login(req, res) {
        console.log("Auth Controller : login ...");
        res.render('user/login');
    },
    async auth(req, res) {
        const loggedIn = await AuthService.login(req.body);
        if (loggedIn) {
            res.redirect('/api/litter/new');
        }else{
            res.redirect('/api/auth/login');
        }
    }
}