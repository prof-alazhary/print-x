const User = require('../models/User'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {
    async login(credentials = {}) {
        console.log("Auth Service : login ...");

        const { user, password } = credentials;
        if(user == "admin" && password == "admin123"){
            return true
        }
        // if (user, password) {
        //     const { password: _password } = (await User.findOne(user) || {});
        //     return password == _password;
        // }
    }
}
