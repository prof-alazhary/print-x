const User = require('../models/User'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {
    create(user = {}) {
        return User.create(user);
    },
    select(userId) {
        return User.findOne({
            ...(userId && { _id: ObjectId(userId) })
        });
    },
    edit(userId) {
        return User.findOne({
            ...(userId && { _id: ObjectId(userId) })
        });
    },
    update(id, date) {
        const { oldPass, email, newPass } = date;
        if (oldPass && email && newPass) {
            return User.findOne({ _id: ObjectId(id), password: oldPass })
                .then(user => {
                    if (user) {
                        return User.update({ _id: ObjectId(id) }, { email, password: newPass })
                            .then(() => User.findOne({ _id: ObjectId(id) }))
                            .then(user => ({ user, message: "تم تعديل البيانات بنجاح" }));
                    } else {
                        return Promise.resolve({ message: "الباسورد القديم غير صحيح!" });

                    }
                })

        } else {
            return Promise.resolve({ message: "يرجى ملئ جميع البيانات" })
        }

    }
};
