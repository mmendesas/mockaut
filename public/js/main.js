angular.module('mockaut', ['ngAnimate', 'ngRoute', 'ngResource','ng.jsoneditor'])
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.when('/admin', {
            templateUrl: 'partials/principal.html',             
        });

        $routeProvider.when('/admin/regras', {
            templateUrl: 'partials/regras.html',
            controller: 'RegrasController'
        });

        $routeProvider.when('/admin/regras/new', {
            templateUrl: 'partials/regra.html',
            controller: 'RegraController'
        });

        $routeProvider.when('/admin/regras/edit/:ruleID', {
            templateUrl: 'partials/regra.html',
            controller: 'RegraController'
        });

        $routeProvider.otherwise({ redirectTo: '/admin' });
    });