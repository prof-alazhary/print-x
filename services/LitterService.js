const Litter = require('../models/Litter'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {
    create(litter) {
        litter = litter || {};
        return Litter.create(litter).then(litter => {
           // return this.select(litter.id);
           return litter
        });
    },
    update(litterId, litter) {
        return Litter.updateOne(
            { _id: ObjectId(litterId) },
            {
                $set: litter
            }
        );
    },
    select(litterId) {
        return Litter.findOne({ _id: ObjectId(litterId) }).then((litter) => {
            return testPDFkit(litter);
        });
    },
    delete(litterId) {
        return Litter.deleteOne({ _id: ObjectId(litterId) });
    },
    search(criteria) {
        const { chassisNo, motorNo, customerName, operator } = criteria || {};

        if (customerName) {
            criteria = {
                'customerData.name': {
                    $regex: new RegExp(`^${customerName}.*`)
                }
            };
        } else {
            criteria = {
                [operator]: [
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
        { model, chassisNo, motorNo, motorNomanufactureYear, color } = machineData,
        { name, nationalId, address, city } = customerData;

    //set background img for testing phase..
    doc.image('resources/img/litter template.jpg', 0, 0, { width: 605, height: 830 });
    //test-print3.pdf

    //set arabic font for arabic text inputs to pdf document.
    doc.font('resources/font/Scheherazade-Regular.ttf').fontSize(25);

    doc.text(destination, 350, 240);

    doc.text(destination,  145, 390);
    
    doc.text(model, 350, 360);

    doc.text(chassisNo, 320, 390);

    doc.text(motorNo, 320, 420);

    doc.text(motorNomanufactureYear || 2019, 320, 450);

    doc.text(color|| "yellow",  320, 480);

    doc.text(rtlText(name), 270, 540);

    doc.text(nationalId,  60, 540);

    doc.text(rtlText(address), 300, 570);

    doc.text(city,  80, 570);

    return doc;
}

function rtlText(text){
    return text.split(" ").reverse().join(" ");
}