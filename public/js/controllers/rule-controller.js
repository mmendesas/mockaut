angular.module('mockaut').controller('RuleController', function ($scope, $routeParams, resourceRule) {

    $scope.rule = {};
    $scope.customMessage = '';
    $scope.responseHAR = {
        "status": 200,
        "statusText": "OK",
        "httpVersion": "HTTP/1.1",
        "headers": [
            { "Date": new Date().toUTCString() },
            { "Connection": 'keep-alive' },
            { "Content-Length": 322 },
            { "Content-Type": "application/json" },
        ],
        "cookies": [],
        "content": {
            "mimeType": "text/plain",
            "text": ""
        }
    }

    if ($routeParams.ruleID) {
        resourceRule.get({ ruleID: $routeParams.ruleID }, function (rule) {
            $scope.rule = rule;
        }, function (err) {
            console.log(err);
            $scope.customMessage = 'Unable to get the Rule';
        });
    }

    $scope.submeter = function () {

        //udpdate responseHAR
        $scope.rule.responseHAR = $scope.responseHAR;

        console.log('HHAR', $scope.rule.responseHAR);

        if ($scope.formulario.$valid && 0 == 5) {
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

});
