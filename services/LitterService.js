const Litter = require('../models/Litter'),
    createPDFDocument = require('../helpers/pdfkit'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {
    create(litter = {}) {
        const { model, chassisNo, motorNo } = litter.machineData;

        return Litter.findOne({
            $or: [
                { 'machineData.motorNo': motorNo },
                { 'machineData.chassisNo': chassisNo }
            ]
        }).then(_litter => {
            if (!_litter) {
                return Litter.create(litter).then(litter => {
                    return this.select(litter.id);
                });
            } else {
                return Promise.reject(
                    new Error(
                        'هذا الخطاب تم عمله من قبل بنفس بيانات المركبة, برجاء مراجعة البيانات!'
                    )
                );
            }
        });
    },
    edit(litterId) {
        return Litter.findOne({ _id: ObjectId(litterId) });
    },
    update(litterId, litter) {
        litter.updatedAt = Date.now();
        return Litter.updateOne(
            { _id: ObjectId(litterId) },
            {
                $set: litter
            }
        ).then(() => this.select(litterId));
    },
    select(litterId) {
        return Litter.findOne({ _id: ObjectId(litterId) }).then(litter => {
            return createPDFDocument(litter);
        });
    },
    delete(litterId) {
        return Litter.deleteOne({ _id: ObjectId(litterId) });
    },
    search(criteria = {}) {
        const { chassisNo, motorNo, dealer, user } = criteria;

        if (dealer) {
            criteria = {
                dealer: {
                    $regex: new RegExp(`^${dealer}.*`)
                }
            };
        } else {
            criteria = {
                $or: [
                    { 'machineData.chassisNo': chassisNo },
                    { 'machineData.motorNo': motorNo }
                ]
            };
        }

        criteria.user = user;
        return Litter.find(criteria);
    }
};
