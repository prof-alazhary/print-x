const UserService = require('./UserService');

module.exports = {
    init() {
        return Promise.all([
            this.createFristUser()
        ]);
    },
    createFristUser() {
        return UserService.select().then(user => {
            if (!user) {
                return UserService.create({
                    name: 'username',
                    email: 'email@email.com',
                    password: '123456789'
                });
            }
        });
    }
};
