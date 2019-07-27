const Litter = require('../models/Litter'),
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
        litter.updatedAt = Date.now;
        return Litter.updateOne(
            { _id: ObjectId(litterId) },
            {
                $set: litter
            }
        ).then(() => this.select(litterId));
    },
    select(litterId) {
        return Litter.findOne({ _id: ObjectId(litterId) }).then(litter => {
            return testPDFkit(litter);
        });
    },
    delete(litterId) {
        return Litter.deleteOne({ _id: ObjectId(litterId) });
    },
    search(criteria = {}) {
        const { chassisNo, motorNo, dealer } = criteria;

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

        return Litter.find(criteria);
    }
};

function testPDFkit(data) {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({
        //layout: 'landscape', // or 'letter' ....
        size: [612, 820] // [doc.page.width, doc.page.height]
    });

    const { destination, machineData, customerData } = data,
        { model, chassisNo, motorNo, manufactureYear, color } = machineData,
        { name, nationalId, address, city } = customerData;

    let { dealer } = data;

    //set background img for testing phase..
    doc.image('public/images/litter template.jpg', 0, 0, {
        width: 605,
        height: 830
    });
    //test-print3.pdf

    //set arabic font for arabic text inputs to pdf document.
    doc.font('public/fonts/Scheherazade-Regular.ttf').fontSize(25);

    doc.text(destination, 350, 240);

    doc.text(destination, 145, 390 - 5);

    doc.font('Times-Bold');
    doc.fontSize(18);

    doc.text(model, 370, 360 + 10);

    doc.text(chassisNo, 315, 390 + 10);

    doc.text(motorNo, 370, 420 + 10);

    doc.text(manufactureYear, 390, 450 + 10);

    doc.text(color, 390, 480) + 10;

    doc.font('public/fonts/Scheherazade-Regular.ttf');
    doc.fontSize(20);

    let nameX = 0;
    const words = name.split(' ');

    switch (words.length) {
        case 5:
            nameX = 280;
            break;
        case 4:
            nameX = 310;
            break;
        case 3:
            nameX = 320;
            break;
        default:
        nameX = 260;
            break;
    }

    doc.text(rtlText(name), nameX, 540);

    doc.text(nationalId, 60, 540);

    doc.text(rtlText(address), 420, 570);

    doc.text(city, 100, 570);

    doc.fontSize(17);
    let dealerX = 510;
    if (dealer.split(' ').length > 1) {
        dealerX = 485;
        dealer = rtlText(dealer);
    }
    //This is a footer
    doc.text(dealer, dealerX, doc.page.height - 30, {
        lineBreak: false
    });

    return doc;
}

function rtlText(text) {
    text = ' ' + text + ' ';
    return text
        .split(' ')
        .reverse()
        .join(' ');
}
