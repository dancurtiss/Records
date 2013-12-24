angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Records",
        "link": "records"
    }, {
        "title": "Add Record",
        "link": "records/create"
    }];
    
    $scope.isCollapsed = false;
}]);