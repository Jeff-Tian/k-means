var config = require('../config/config.js');
var locales = require('../locales');

module.exports = require('express').Router()
    .get(locales.localePath('/'), function (req, res, next) {
        res.render('index.jade');
    })
    .get(locales.localePath(''), function (req, res, next) {
        res.render('index.jade');
    })
    .get('/this', function (req, res, next) {
        res.render('index.jade');
    })
    .get('/virtual-scripts', require('./virtual-scripts.js'))
    .get('/ping', function (req, res) {
        res.send('pong');
    })
    .get('/__', function (req, res) {
        res.send(res.__('Test i18n'));
    })
;