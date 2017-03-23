angular.module('mockaut').controller('ProjectsController', function ($scope, $http) {

    $scope.projects = [];

    $http.get('v1/projects')
        .success(function (projects) {
            $scope.projects = projects;
        })
        .error(function (err) {
            console.log(err);
        });

});