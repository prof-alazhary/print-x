const { model, Schema } = require('../config/mongoose'),
    promisify = require('../helpers/promisify');

const litterSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    dealer: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        default: ''
    },
    machineData: {
        model: String,
        chassisNo: {
            type: String,
            unique: true
        },
        motorNo: {
            type: String,
            unique: true
        },
        manufactureYear: String,
        color: String
    },
    customerData: {
        type: Object,
        default: {
            name: '',
            nationalId: '',
            address: '',
            city: ''
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

//litterSchema.index({'machineData.chassisNo':'text', 'machineData.motorNo': 1, 'machineData.model': 1 });
//litterSchema.index({"dealer":"text"});

const Litter = model('Litter', litterSchema);

promisify(Litter, [
    'updateOne',
    'update',
    'find',
    'findOne',
    'create',
    'deleteOne',
    'deleteMany'
]);

module.exports = Litter;
