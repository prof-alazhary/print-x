'use strict';

const ExcelParser = require('./lib/excel-parser');

module.exports = {
    readFile(filePath, options={}) {
        //return Object that contain all sheets ex: {sheet1:[{},...], sheet2:[{},...]}
        if (filePath) {
            return ExcelParser.readFromFile(filePath, options);
        } else {
            throw Error('missing data inputs!');
        }
    },
    readBuffer(buffer, options={}) {
        if (buffer) {
            return ExcelParser.readFromBuffer(buffer, options);
        } else {
            throw Error('missing data inputs!');
        }
    },
    writeFile(filePath, data = {}) {
        if (filePath && Object.keys(data).length) {
            return ExcelParser.writeToFile(filePath, data);
        } else {
            throw Error('missing data inputs!');
        }
    },
    writeBuffer(buffer){
        if (buffer) {
            return ExcelParser.writeToBuffer(buffer);
        } else {
            throw Error('missing data inputs!');
        }
    }
};
