angular.module('mockaut', ['ngAnimate', 'ngRoute', 'meusServicos', 'ng.jsoneditor'])
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.when('/admin', {
            templateUrl: 'partials/principal.html',
        });

        /**
         * Rules routes
         */
        $routeProvider.when('/admin/rules', {
            templateUrl: 'partials/rules.html',
            controller: 'RulesController'
        });

        $routeProvider.when('/admin/rules/new', {
            templateUrl: 'partials/rule.html',
            controller: 'RuleController'
        });

        $routeProvider.when('/admin/rules/edit/:ruleID', {
            templateUrl: 'partials/rule.html',
            controller: 'RuleController'
        });

        /**
         * Projects routes
         */
        $routeProvider.when('/admin/projects', {
            templateUrl: 'partials/projects.html',
            controller: 'ProjectsController'
        });

        $routeProvider.when('/admin/projects/new', {
            templateUrl: 'partials/project.html',
            controller: 'ProjectController'
        });

        $routeProvider.when('/admin/projects/edit/:projectID', {
            templateUrl: 'partials/project.html',
            controller: 'ProjectController'
        });

        $routeProvider.otherwise({ redirectTo: '/admin' });
        
    });