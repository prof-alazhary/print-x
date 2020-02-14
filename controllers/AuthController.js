const AuthService = require('../services/AuthService');

module.exports = {
    async auth(req, res) {
        const user = await AuthService.auth(req.body);
        if (user) {
            const _user = { id: user._id, name: user.name, email: user.email };
            req.session.loggedIn = true;
            req.session.user = _user;
            res.redirect('/api/litter/new');
        } else {
            res.redirect('/login');
        }
    }
}