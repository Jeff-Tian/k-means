var config = require('../config/config.js');

module.exports = require('express').Router()
    .get('/', function (req, res, next) {
        res.render('index.jade', {
            cdn: config.cdn,
            title: 'canvas'
        });
    })
    .get('/virtual-scripts', require('./virtual-scripts.js'))
;