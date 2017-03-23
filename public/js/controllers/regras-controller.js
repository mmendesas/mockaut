angular.module('mockaut').controller('RegrasController', function ($scope, $http, $resource) {

    $scope.regras = [];
    $scope.filtro = '';
    $scope.mensagem = '';

    var resourceRule = $resource('v1/regras/:ruleID');

    $http.get('v1/regras')
        .success(function (regras) {
            $scope.regras = regras;
        })
        .error(function (err) {
            console.log(err);
        });

    $scope.remover = function (regra) {
        $http.delete('v1/regras/' + regra._id)
            .success(function () {
                var idxRule = $scope.regras.indexOf(regra);
                $scope.regras.splice(idxRule, 1); //remove from the list
                $scope.mensagem = 'Regra ' + regra.name + ' removida com sucesso.';
            })
            .error(function (err) {
                $scope.mensagem = 'Não foi possível remover a regra ' + regra.name;
            });
    };

});