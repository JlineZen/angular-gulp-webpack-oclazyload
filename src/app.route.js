/**
 * @desc we definite route function
 */


/**
 * @desc angular can also use a param that stand the inject module
 */
function route($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', { //index route
            url: '/index',
            template: require('./index/index.html'),
            controller: 'indexCtrl',
            resolve: {
                loadIndexModule: function($q, $ocLazyLoad) {
                    $q(function(resolve) {
                        var module = require('./index/index.module');
                        $ocLazyLoad.load({name: module.name});
                        resolve(module.controller);
                    });
                }
            }
        });
}

module.exports = angular.module('app.route', []).config(route);