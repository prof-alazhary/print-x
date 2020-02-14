const User = require('../models/User'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {
    async auth(credentials = {}) {
        console.log("Auth Service : login ...");
        const { user, password } = credentials;
        return User.findOne({ email: user, password });
    }
}
