angular.module('mean.records').controller('RecordsController', ['$scope', '$routeParams', '$location', 'Global', 'Records','$notification', function ($scope, $routeParams, $location, Global, Records, $notification) {
    $scope.global = Global;

    $scope.create = function() {
        var record = new Records({
            artist: this.artist,
            sidea: this.sidea,
            sideb: this.sideb,
            year: this.year
        });
        record.$save(function(response) {
            //$location.path("records");
            //Don't go anywhere just show that it was added.
            $notification.success('Record Added', 'Record: ' + record.artist + ' was added to your list.', null);
        });

        this.artist = "";
        this.sidea = "";
        this.sideb = "";
        this.year = "";
    };

    $scope.remove = function(record) {
        record.$remove();  

        for (var i in $scope.records) {
            if ($scope.records[i] == record) {
                $scope.records.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var record = $scope.record;
        if (!record.updated) {
            record.updated = [];
        }
        record.updated.push(new Date().getTime());

        record.$update(function() {
            $location.path('records');
        });
    };

    $scope.find = function() {
        Records.query(function(records) {
            $scope.records = records;
        });
    };

    $scope.findOne = function() {
        Records.get({
            recordId: $routeParams.recordId
        }, function(record) {
            $scope.record = record;
        });
    };
}]);