module.exports = require('angular').module('app', [
    require('angular-ui-router'),
    require('oclazyload'),
    require('./app.route').name
]);