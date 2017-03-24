angular.module('mockaut').controller('ProjectController', function ($scope, $http, $routeParams) {

    $scope.project = {};
    $scope.message = '';

    $scope.uploadFile = function (files) {
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);

        console.log(files[0]);
        // $http.post(uploadUrl, fd, {
        //     withCredentials: true,
        //     headers: { 'Content-Type': undefined },
        //     transformRequest: angular.identity
        // }).success(...all right!... ).error( ..damn!... );

    };

    $scope.submeter = function () {
        if ($scope.formulario.$valid) {
            if ($scope.project._id) {
                $http.put('v1/projects/' + $scope.project._id, $scope.project)
                    .success(function () {
                        $scope.message = 'Project ' + $scope.project.name + ' alterado com sucesso';
                    })
                    .error(function (err) {
                        console.log(err);
                        $scope.message = 'Não foi possível alterar o Project' + $scope.project.name;
                    });
            } else {
                $http.post('v1/projects', $scope.project)
                    .success(function () {
                        $scope.project = {};
                        $scope.message = 'Project incluído com sucesso';
                    }).error(function (err) {
                        console.log(err);
                        $scope.message = 'Não foi possível incluir o Project';
                    });
            }
        }
    };

});