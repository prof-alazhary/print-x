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
        { model, chassisNo, motorNomanufactureYear, color } = machineData,
        { name, nationalId, address, city } = customerData;

       // console.log(data)

    doc.image('resources/img/litter template.jpg', 0, 0, { width: 605, height: 830 }); //{fit: [580, 780], align: 'center', valign: 'center'} ) //, align: 'center', valign: 'center'
    //test 3  ==> {width: 605, height: 830}
    //.rect(430, 15, 100, 100).stroke();

    doc.font('resources/font/Scheherazade-Regular.ttf').fontSize(25).text(destination, 100, 80);//charset=UTF-8"

    doc.circle(280, 200, 50).fill('#6600FF');

    // and some justified text wrapped into columns
    doc.text(name, 100, 300)
        .font('Times-Roman', 13)
        .moveDown()
        .text(chassisNo, {
            width: 412,
            align: 'justify',
            indent: 30,
            columns: 2,
            height: 300,
            ellipsis: true
        });

    return doc;
}
