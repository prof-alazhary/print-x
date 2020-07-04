const xlsx = require('xlsx');
const fs = require('fs');

function formatDataTojson(workbook, options) {
    let sheetNames = workbook.SheetNames;
    let obj = {};
    for (let i = 0; i < sheetNames.length; i++) {
        const sheetName = sheetNames[i],
            sheetObj = workbook.Sheets[sheetName];

        obj[sheetName] = convertToJson(sheetName, sheetObj, options);
    };

    return obj;
}

function formatDataToSheets(data) {
    const sheets = {};
    for (const key in data) {
        const elements = data[key].data;
        sheets[key] = xlsx.utils.json_to_sheet(elements, { header: data[key].columns });
    }

    return sheets;
}

function convertToJson(sheetName, sheetObj, options = {}) {

    const { skipBlankColumn } = options;

    if (skipBlankColumn) {
        return xlsx.utils.sheet_to_json(sheetObj, { row: true, blankrows: true });
    } else {
        const jsonSheet = xlsx.utils.sheet_to_json(sheetObj);
        const columns = getHeaderOfsheet(sheetObj);

        if (!options.columns) {
            options.columns = {};
        }
        options.columns[sheetName] = columns;

        return jsonSheet;
    }
}

function getHeaderOfsheet(sheet) {
    return xlsx.utils.sheet_to_json(sheet, { header: 1 })[0];
}

module.exports = {
    formatDataToSheets,
    formatDataTojson
}