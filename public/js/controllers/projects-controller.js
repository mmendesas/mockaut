angular.module('mockaut').controller('ProjectsController', function ($scope, $http) {

    $scope.projects = [];
    $scope.filtro = '';
    $scope.message = '';

    $http.get('v1/projects')
        .success(function (projects) {
            $scope.projects = projects;
        })
        .error(function (err) {
            console.log(err);
        });

    $scope.remove = function (project) {
        $http.delete('v1/projects' + project._id)
            .success(function () {
                var idxProject = $scope.projects.indexOf(project);
                $scope.projects.splice(idxProject, 1); //remove from the list
                $scope.message = 'Project ' + project.name + ' removido com sucesso';
            })
            .error(function (err) {
                $scope.mensagem = 'Não foi possivel remover o projeto ' + project.name;
            });
    };
    
});