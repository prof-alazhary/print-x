const Litter = require('../models/Litter'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {

    create(ref) {
        ref = ref || {};
        return Litter.create(ref);
    },
    update(refId, ref) {
        return Litter.updateOne({_id: ObjectId(refId)},{
            $set: ref
        })
    },
    select(refId) {
        return Litter.findOne({ _id: ObjectId(refId) });
    },
    delete(refId){
        return Litter.deleteOne({ _id: ObjectId(refId) });
    },
    search(criteria){
        const {tags, summary } = criteria;

        if(tags){
            return Litter.find({ tags: { $in: tags } })
        }else if(summary){
            return Litter.find( { $text: { $search: summary } } )
        }else{
            return Promise.reject(new Error('you should have seach by tags or summary!'));
        }
    }
}