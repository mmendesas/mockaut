angular.module('mockaut').controller('RegraController', function ($scope, $http, $routeParams) {

    $scope.regra = {};
    $scope.mensagem = '';

    if ($routeParams.ruleID) {
        $http.get('/v1/regras/' + $routeParams.ruleID)
            .success(function (rule) {
                $scope.regra = rule;
            })
            .error(function (err) {
                console.log(err);
                $scope.mensagem = 'Não foi possível obter a regra';
            });
    }

    $scope.submeter = function () {
        if ($scope.formulario.$valid) {
            if ($scope.regra._id) {
                $http.put('v1/regras/' + $scope.regra._id, $scope.regra)
                    .success(function () {
                        $scope.mensagem = 'Regra ' + $scope.regra.name + ' alterada com sucesso';
                    })
                    .error(function (err) {
                        console.log(err);
                        $scope.mensagem = 'Não foi possível alterar a Regra' + $scope.regra.name;
                    });
            } else {
                $http.post('v1/regras', $scope.regra)
                    .success(function () {
                        $scope.regra = {};
                        $scope.mensagem = 'Regra incluída com sucesso';
                    }).error(function (err) {
                        console.log(err);
                        $scope.mensagem = 'Não foi possível incluir a Regra';
                    });
            }
        }
    };

    //gambeta minha, arrumar depois
    var jsonExp = { "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123, "String": "Hello World Expected" };
    var jsonRsp = { "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123, "Object": { "a": "b", "c": "d" }, "String": "Hello World Respponse" };
    $scope.jsonExpected = { data: jsonExp, options: { mode: 'tree' } };
    $scope.jsonResponse = { data: jsonRsp, options: { mode: 'tree' } };


});
