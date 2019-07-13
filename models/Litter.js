const { model, Schema } = require('../config/mongoose'),
    promisify = require('../helpers/promisify');

const litterSchema = new Schema({
    user:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        default: ""
    },
    machineData:{
        type: Object,
        default:{
            model:"",
            chassisNo:"",
            motorNo:"",
            manufactureYear:"",
            color:""
        }
    },
    customerData:{
        type: Object,
        default:{
            name:"",
            nationalId:"",
            address:"",
            city:""
        }
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

litterSchema.index({'machineData.chassisNo':'text', 'machineData.motorNo': 1, 'machineData.model': 1 });

const Litter = model('Litter', litterSchema);

promisify(Litter,['updateOne','update','find', 'findOne','create','deleteOne']);

module.exports = Litter;