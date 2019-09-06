const UserService = require('./UserService');
const migration = require('../migration');

module.exports = {
    init() {
        return migration.run().then(() => {
            return Promise.all([this.createFristUser()]);
        });
    },
    initGlobals(){
        global.appConfig = require('../config/appConfig');
        global.object = require('../helpers/object');
    },
    createFristUser() {
        return UserService.select().then(user => {
            if (!user) {
                return UserService.create({
                    name: 'username',
                    email: 'email@email.com',
                    password: '123456789'
                }).then(user => (global.userId = user._id));
            } else {
                global.userId = user._id;
            }
        });
    }
};
