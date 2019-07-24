const Litter = require('./models/Litter');
const User = require('./models/User');

module.exports = {
    run() {
        return Promise.all([
            this.dropLitters()
        ]);
    },
    dorpDB() {
        return Promise.all([Litter.deleteMany({}), User.deleteMany({})]);
    },
    dropLitters() {
        return Litter.deleteMany({});
    }
};
