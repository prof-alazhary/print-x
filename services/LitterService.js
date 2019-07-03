const Litter = require('../models/Litter'),
    { ObjectId } = require('../config/mongoose').Types;

module.exports = {

    create(litter) {
        litter = litter || {};
        return Litter.create(litter)
                .then((litter)=>{
                    return this.select(litter.id);
                });
    },
    update(litterId, litter) {
        return Litter.updateOne({_id: ObjectId(litterId)},{
            $set: litter
        })
    },
    select(litterId) {
        return Litter.findOne({ _id: ObjectId(litterId) })
        .then(()=>{
            return testPDFkit();
        });
    },
    delete(litterId){
        return Litter.deleteOne({ _id: ObjectId(litterId) });
    },
    search(criteria){
        const {chassisNo, motorNo, customerName, operator } = criteria || {};

        if(customerName){
            criteria = { 'customerData.name': { $regex: new RegExp(`^${customerName}.*`)} };
        }else {
            criteria = { [operator]:[{'machineData.chassisNo':chassisNo}, {'machineData.motorNo':motorNo }]  };
        }

        return Litter.find(criteria);
    }
}

function testPDFkit(){
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();

    doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

    // some vector graphics
    doc
      .save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill('#FF3300');
    
    doc.circle(280, 200, 50).fill('#6600FF');
    
    // an SVG path
    doc
      .scale(0.6)
      .translate(470, 130)
      .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
      .fill('red', 'even-odd')
      .restore();
    
    // and some justified text wrapped into columns
    doc
      .text('And here is some wrapped text...', 100, 300)
      .font('Times-Roman', 13)
      .moveDown()
      .text("blaaaaa blaaaaaa blaaaaaaa", {
        width: 412,
        align: 'justify',
        indent: 30,
        columns: 2,
        height: 300,
        ellipsis: true
      });

      return doc;
}