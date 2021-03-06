function createPDFDocument(data) {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({
        //layout: 'landscape', // or 'letter' ....
        size: [612, 820] // [doc.page.width, doc.page.height]
    });

    const { destination, machineData, customerData, createdAt, updatedAt } = data,
        { model, chassisNo, motorNo, manufactureYear, color } = machineData,
        { name, nationalId, address, city } = customerData;

    let { dealer } = data;

    //set background img for testing phase..
    // doc.image('public/images/litter template.jpg', 0, 0, {
    //     width: 605,
    //     height: 830
    // });
    //test-print3.pdf

    //set arabic font for arabic text inputs to pdf document.
    doc.font('public/fonts/Scheherazade-Regular.ttf').fontSize(25);

    doc.text(rtlText(destination), 350, 240);

    doc.text(rtlText(destination), 145, 390 - 5);

    doc.font('Times-Bold');
    doc.fontSize(19);

    doc.text(model, 370, 360 + 10);

    doc.text(chassisNo, 315 - 5, 390 + 10);

    doc.text(motorNo, 370, 420 + 10);

    doc.text(manufactureYear, 390, 450 + 10);

    doc.font('public/fonts/Scheherazade-Bold.ttf');
    doc.fontSize(21);

    doc.text(color, 390, 480);

    let nameX = 460,
        chars = name.length;

    nameX = nameX - (chars * 6);

    doc.text(rtlText(name), nameX - chars, 540);


    doc.text(nationalId, 60, 540);

    doc.text(rtlText(address), 420, 570);

    doc.text(rtlText(city), 100, 570);

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

    const printData = updatedAt  ? getFormattedDate(updatedAt) : getFormattedDate(createdAt);
    doc.text(printData, dealerX-100, doc.page.height - 30, {
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

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
}

module.exports = createPDFDocument;