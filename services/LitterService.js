const Litter = require('../models/Litter'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {

    create(litter) {
        litter = litter || {};
        return Litter.create(litter);
    },
    update(litterId, litter) {
        return Litter.updateOne({_id: ObjectId(litterId)},{
            $set: litter
        })
    },
    select(litterId) {
        return Litter.findOne({ _id: ObjectId(litterId) });
    },
    delete(litterId){
        return Litter.deleteOne({ _id: ObjectId(litterId) });
    },
    search(criteria){
        const {chassisNo, motorNo, customerName, operator } = criteria;

        if(customerName){
            criteria = { 'customerData.name': { $regex: new RegExp(`^${customerName}.*`)} };
        }else {
            criteria = { [operator]:[{'machineData.chassisNo':chassisNo}, {'machineData.motorNo':motorNo }]  };
        }

        return Litter.find(criteria);
    }
}