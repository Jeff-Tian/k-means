var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var jade = require('jade');

var fs = require('fs');

var staticFolder = __dirname + '/public';
try {
    var stats = fs.lstatSync(__dirname + '/dist');
    if (stats.isDirectory()) {
        staticFolder = __dirname + '/dist';
    }

    console.log('use ', staticFolder, ' as static folder.');
} catch (ex) {
    console.error(ex);
}

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

app.set('port', (process.env.PORT || 60004));

app.use(require('./routes/index.js'));

app.listen(app.get('port'), function () {
    console.log('k-means application is running on port ', app.get('port'));
});