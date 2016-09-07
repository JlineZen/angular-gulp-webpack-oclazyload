var model = angular.module('index.module', []);
var controller = require('./index.controller');
var directive = require('./index.directive');

model.controller('indexCtrl', controller)
    .directive('indexDirective', directive.index);

module.exports = model;