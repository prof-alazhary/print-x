const { model, Schema } = require('../config/mongoose'),
    promisify = require('../helpers/promisify');

const userSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: email
    },
    password:{
        type: password
    }
});

const User = model('User', userSchema);

promisify(User,['updateOne','update','find', 'findOne','create','deleteOne']);

module.exports = User;