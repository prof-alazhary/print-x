const UserService = require('../services/UserService');

module.exports = {
    login(req, res) {
        UserService.login();
        res.render('user/login');
    }
}