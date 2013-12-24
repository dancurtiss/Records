//Records service used for records REST endpoint
angular.module('mean.records').factory("Records", ['$resource', function($resource) {
    return $resource('records/:recordId', {
        recordId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);