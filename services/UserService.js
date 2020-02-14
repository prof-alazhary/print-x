const User = require('../models/User'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {
    create(user = {}) {
        return User.create(user);
    },
    select(userId) {
        return User.findOne({
            ...(userId && { _id: ObjectId(userId)})
        });
    },
    edit(userId){
        return User.findOne({
            ...(userId && { _id: ObjectId(userId)})
        });
    },
    update(){

    }
};
