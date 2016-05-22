var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var jade = require('jade');

var staticFolder = __dirname + '/public';
var viewFolder = __dirname + '/views';
app.set('views', viewFolder);

var staticSetting = {
    etag: true,
    lastModified: true,
    maxAge: 1000 * 3600 * 24 * 30,
    setHeaders: function (res, path) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
};

app.use(express.static(staticFolder, staticSetting));
app.use('/virtual-scripts/cube', express.static(__dirname + '/cube', staticSetting));

app.set('port', (process.env.PORT || 60004));

app.use(require('./routes/index.js'));

app.listen(app.get('port'), function () {
    console.log('cube application is running on port ', app.get('port'));
});