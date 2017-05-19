angular.module('meusServicos', ['ngResource'])

    .factory('resourceRule', function ($resource) {
        return $resource('v1/rules/:ruleID', null, {
            update: { method: 'PUT' },
            teste: { method: 'GET' }
        });
    })
    .factory('resourceProject', function ($resource) {
        return $resource('v1/projects/:projectID', null, {
            update: { method: 'PUT' }
        });
    })
    .factory('rulesRegistration', function (resourceRule, $q) {
        var myService = {};

        myService.registerRule = function (rule) {
            return $q(function (resolve, reject) {
                if (rule._id) {
                    //update rule
                    resourceRule.update({ ruleID: rule._id }, rule, function () {
                        resolve({
                            message: 'Rule ' + rule.name + ' successfully updated',
                            isInclusion: false
                        });
                    }, function (err) {
                        console.log(err);
                        reject({
                            message: 'Unable to update the rule'
                        });
                    });

                } else {
                    //save new rule
                    resourceRule.save(rule, function () {
                        resolve({
                            message: 'Rule' + rule.name + ' successfully saved',
                            isInclusion: true
                        });
                    }, function (err) {
                        console.log(err);
                        reject({
                            message: 'Unable to include the rule ' + rule.name
                        });
                    });
                }
            });
        }
        return myService;
    });