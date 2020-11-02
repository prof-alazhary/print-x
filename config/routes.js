const fs = require('fs');
const routesPath = './routes';
const routes = [] // [{path:<path>, handler:<handler>},...]

const files = fs.readdirSync(routesPath);

files.forEach(fileName => {
    fileName = fileName.replace('.js', '');

    const path = fileName == 'home' ? '/' :  `/api/${fileName}`;
    routes.push({path, handler: require(`.${routesPath}/${fileName}`)});

});

module.exports = routes;