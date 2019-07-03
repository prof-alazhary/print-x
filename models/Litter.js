const { model, Schema } = require('../config/mongoose'),
    promisify = require('../helpers/promisify');

const litterSchema = new Schema({
    user:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        default: ''
    },
    machineData:{
        type: Object,
        default:{
            model:'',
            chassisNo:'',
            motorNo:'',
            manufactureYear:'',
            color:''

        }
    },
    customerData:{
        type: Object,
        default:{
            name:'',
            nationalId:'',
            address:'',
            city:''
        }
    }
});

litterSchema.index({'machineData.model':'text'});

const Litter = model('Litter', litterSchema);

promisify(Litter,['updateOne','update','find', 'findOne','create','deleteOne']);

module.exports = Litter;