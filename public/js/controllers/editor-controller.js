// var json = {
//     "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123,
//     "Object": { "a": "b", "c": "d" }, "String": "Hello World",
//     "auto": "$Hello World"
// };

// angular.module('mockaut').controller('ngCtrl', function ($scope) {
//     $scope.obj = { data: json, options: { mode: 'tree' } };
//     $scope.onLoad = function (instance) {
//         instance.expandAll();
//         this.options.mode = 'code';
//         this.options.completer = [
//             { value: "$sameer", score: 1000, meta: "custom" },
//             { value: "$rathore", score: 1000, meta: "custom" }
//         ];
//     };
//     $scope.changeData = function () {
//         $scope.obj.data = { foo: 'bar' };
//     };
//     $scope.changeOptions = function () {
//         $scope.obj.options.mode = $scope.obj.options.mode == 'tree' ? 'code' : 'tree';
//     };
//     $scope.pretty = function (obj) {
//         return obj;
//     };
// });

// angular.module('mockaut').controller('MyController', function ($scope) {
//     $scope.obj = { data: json, options: { mode: 'tree' } };

//     $scope.btnClick = function () {
//         $scope.obj.options.mode = 'code'; //should switch you to code view
//     }
// });


var json = { "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123, "Object": { "a": "b", "c": "d" }, "String": "Hello World" };

angular.module('mockaut').controller('ngCtrl', function ($scope) {
    $scope.obj = { data: json, options: { mode: 'tree' } };
    $scope.onLoad = function (instance) {
        instance.expandAll();
    };
    $scope.changeData = function () {
        $scope.obj.data = { foo: 'bar' };
    };
    $scope.changeOptions = function () {
        $scope.obj.options.mode = $scope.obj.options.mode == 'tree' ? 'code' : 'tree';
    };

    //other
    $scope.pretty = function (obj) {
        return angular.toJson(obj, true);
    }
});