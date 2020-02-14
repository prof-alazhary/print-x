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
        const user = req.body;
        trimInputs(user);
        UserService.update(req.session.user.id, user)
            .then(result => {

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