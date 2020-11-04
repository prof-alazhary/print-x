const url = require('url');
const { oldHostName, newHostName } = require('../config/appConfig');

module.exports = (req, res, next) => {
    const hostname = req.headers.host;
    if (hostname.includes(oldHostName)) { //|| hostname.includes('localhost')
        const baseUrl = req.originalUrl;
        const newApp = newHostName + baseUrl;
        console.log('baseUrl:', baseUrl);
        console.log('newApp ====>>', newApp);
        res.redirect(newApp);
    } else {
        next();
    }
}