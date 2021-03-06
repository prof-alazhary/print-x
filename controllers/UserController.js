const UserService = require('../services/UserService');

module.exports = {
    edit(req, res, next) {
        UserService.edit(req.session.user.id)
            .then(user => {
                res.render('user/edit', { user });
            })
            .catch(err => {
                res.render('error', { err });
            });;
    },
    update(req, res, next) {
        const userData = req.body;
        trimInputs(userData);
        UserService.update(req.session.user.id, userData)
            .then(({ user, message }) => {
                if (user) {
                    req.session.user = { id: user._id, name: user.name, email: user.email };
                }
                user = user || userData;
                res.render('user/edit', { user, message });
            })
            .catch(err => {
                res.render('error', { err });
            });
    },
}

function trimInputs(object) {
    for (const key in object) {
        object[key] = object[key].trim();
    }
}