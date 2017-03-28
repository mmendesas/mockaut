angular.module('mockaut').controller('RulesController', function ($scope, resourceRule) {

    $scope.rules = [];
    $scope.filtro = '';
    $scope.customMessage = '';

    resourceRule.query(function (rules) {
        $scope.rules = rules;
    }, function (err) {
        console.log(err);
    });

    $scope.remover = function (rule) {
        resourceRule.delete({ ruleID: rule._id }, function () {
            var idxRule = $scope.rules.indexOf(rule);
            $scope.rules.splice(idxRule, 1); //remove from the list
            $scope.customMessage = 'Rule ' + rule.name + ' successfully removed.';
        }, function (err) {
            console.log(err);
            $scope.customMessage = 'Unable to remove the rule ' + rule.name;
        });
    };
});