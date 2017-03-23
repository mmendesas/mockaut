angular.module('minhasDiretivas', [])
    .directive('meuBotaoPerigo', function () {

        var ddo = {};

        ddo.restrict = 'E';
        ddo.scope = {
            name: '@',
            myAction: '&'
        }

        ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

        return ddo;
    })