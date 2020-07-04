const xlsx = require('xlsx');

const { formatDataToSheets, formatDataTojson } = require('./Helpers');

class ExcelParser {
    constructor() {
    }

    static readFromFile(filePath, options) {
        let workbook = xlsx.readFile(filePath);
        return formatDataTojson(workbook, options);
    }

    static readFromBuffer(buffer, options) {
        let workbook = xlsx.read(buffer, { type: "buffer" });
        return formatDataTojson(workbook, options);
    }

    static writeToFile(filePath, data) {
        const workbook = xlsx.utils.book_new();
        let sheets = formatDataToSheets(data);
        for (const key in sheets) {
            const elements = sheets[key];
            xlsx.utils.book_append_sheet(workbook, elements, key);
        }

        return xlsx.writeFile(workbook, filePath);
    }

    static writeToBuffer(data) {
        const workbook = xlsx.utils.book_new();
        let sheets = formatDataToSheets(data);
        for (const key in sheets) {
            const elements = sheets[key];
            xlsx.utils.book_append_sheet(workbook, elements, key);
        }

        return xlsx.write(workbook, { type: "buffer" });
    }
}

module.exports = ExcelParser;