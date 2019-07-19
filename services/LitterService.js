const Litter = require('../models/Litter'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {
    create(litter = {}) {
        const { model, chassisNo, motorNo } = litter.machineData;

        return Litter.findOne({
            $and: [
                { 'machineData.motorNo': motorNo },
                { 'machineData.chassisNo': chassisNo },
                { 'machineData.model': model }
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
    edit(litterId){
        return Litter.findOne({ _id: ObjectId(litterId) })
    },
    update(litterId, litter) {
        return Litter.updateOne(
            { _id: ObjectId(litterId) },
            {
                $set: litter
            })
            .then(()=>this.select(litterId));
    },
    select(litterId) {
        return Litter.findOne({ _id: ObjectId(litterId) }).then(litter => {
            return testPDFkit(litter);
        });
    },
    delete(litterId) {
        return Litter.deleteOne({ _id: ObjectId(litterId) });
    },
    search(criteria={}) {
        const { chassisNo, motorNo, dealer } = criteria;

        if (dealer) {
            criteria = {
                'dealer': {
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

        return Litter.find(criteria);
    }
};

function testPDFkit(data) {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    const { destination, machineData, customerData } = data,
        {
            model,
            chassisNo,
            motorNo,
            motorNomanufactureYear,
            color
        } = machineData,
        { name, nationalId, address, city } = customerData;

    let { dealer } = data;

    console.log('dealer--->',dealer)

    //set background img for testing phase..
    doc.image('public/images/litter template.jpg', 0, 0, {
        width: 605,
        height: 830
    });
    //test-print3.pdf

    //set arabic font for arabic text inputs to pdf document.
    doc.font('public/fonts/Scheherazade-Regular.ttf').fontSize(25);

    doc.text(destination, 350, 240);

    doc.text(destination, 145, 390);

    doc.text(model, 320, 360);

    doc.text(chassisNo, 320, 390);

    doc.text(motorNo, 320, 420);

    doc.text(motorNomanufactureYear , 320, 450);

    doc.text(color, 320, 480);

    doc.text(rtlText(name), 270, 540);

    doc.text(nationalId, 60, 540);

    doc.text(rtlText(address), 300, 570);

    doc.text(city, 80, 570);

    let dealerX = 490;
    if(dealer.split(' ').length>1){
        dealerX = 475
        dealer = rtlText(dealer);
    }

    console.log(dealer)

    doc.fontSize(17);

    doc.text(dealer, dealerX, 680);

    return doc;
}

function rtlText(text) {
    return text
        .split(' ')
        .reverse()
        .join(' ');
}
