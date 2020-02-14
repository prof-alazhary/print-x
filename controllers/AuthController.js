const AuthService = require('../services/AuthService');

module.exports = {
    async auth(req, res) {
        const user = await AuthService.auth(req.body);
        if (user) {
            req.session.loggedIn = true;
            req.session.user = { id: user._id, name: user.name, email: user.email };
            res.redirect('/api/litter/new');
        } else {
            res.redirect('/login');
        }
    }
}