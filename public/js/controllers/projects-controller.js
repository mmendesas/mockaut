angular.module('mockaut').controller('ProjectsController', function ($scope, resourceProject) {

    $scope.projects = [];
    $scope.filtro = '';
    $scope.customMessage = '';

    resourceProject.query(function (projects) {
        $scope.projects = projects;
    }, function (err) {
        console.log(err);
    });

    $scope.remove = function (project) {
        resourceProject.delete({ projectID: project._id }, function () {
            var idxProject = $scope.projects.indexOf(project);
            $scope.projects.splice(idxProject, 1); //remove from the list
            $scope.customMessage = 'Project ' + project.name + ' successfully removed';
        }, function (err) {
            console.log(err);
            $scope.customMessage = 'Unable to remove the project ' + project.name;
        });
    };

});