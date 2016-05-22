var fs = require('fs');
var path = require('path');

var filePath = './config_dev.json';

if (process.env.NODE_ENV === 'prd') {
    filePath = './config_prd.json';
}

var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8'));

var pack = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));

config.cdn.version = pack.version + '_' + new Date().getTime();

config.cdn.cdnify = function (resource) {
    return config.cdn.host + resource + '?' + config.cdn.version;
};

module.exports = config;