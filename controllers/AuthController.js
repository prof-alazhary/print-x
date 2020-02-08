const AuthService = require('../services/AuthService');

module.exports = {
    login(req, res) {
        AuthService.login();
        res.render('user/login');
    }
}