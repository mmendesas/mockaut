angular.module('mockaut').controller('RuleController', function ($scope, $routeParams, resourceRule) {

    $scope.rule = {};
    $scope.customMessage = '';

    if ($routeParams.ruleID) {
        resourceRule.get({ ruleID: $routeParams.ruleID }, function (rule) {
            $scope.rule = rule;
        }, function (err) {
            console.log(err);
            $scope.customMessage = 'Unable to get the Rule';
        });
    }

    $scope.submeter = function () {
        if ($scope.formulario.$valid) {
            //update current rule
            if ($routeParams.ruleID) {
                resourceRule.update({ ruleID: $scope.rule._id }, $scope.rule, function () {
                    $scope.customMessage = 'Rule ' + $scope.rule.name + ' successfully updated';
                }, function (err) {
                    console.log(err);
                    $scope.customMessage = 'Unable to update the Rule' + $scope.rule.name;
                });
            }
            // create new rule
            else {

                $scope.rule.isDefault = false;
                console.log('minha Regra', $scope.rule);

                resourceRule.save($scope.rule, function () {
                    $scope.rule = {};
                    $scope.customMessage = 'Rule successfully included';
                }, function (err) {
                    console.log(err);
                    $scope.customMessage = 'Unable to save the Rule';
                });
            }
        }
    };

    //gambeta minha, arrumar depois
    var jsonExp = { "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": '[2]123', "String": "Hello World Expected" };
    var jsonRsp = { "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123, "Object": { "a": "b", "c": "d" }, "String": "Hello World Response" };
    $scope.jsonExpected = { data: jsonExp, options: { mode: 'tree' } };
    $scope.jsonResponse = { data: jsonRsp, options: { mode: 'tree' } };
});
