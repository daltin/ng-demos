(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$scope', '$q', 'dataservice', 'logger'];

    function Dashboard($scope, $q, dataservice, logger) {

        $scope.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        $scope.avengerCount = 0;
        $scope.cast = [];
        $scope.title = 'Dashboard';

        $scope.getAvengerCount = function() {
            return dataservice.getAvengerCount().then(function(data) {
                $scope.avengerCount = data;
                return $scope.avengerCount;
            });
        };

        $scope.getAvengersCast = function () {
            return dataservice.getAvengersCast().then(function(data) {
                $scope.cast = data;
                return $scope.cast;
            });
        };

        $scope.activate = function() {
            var promises = [$scope.getAvengerCount(), $scope.getAvengersCast()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        };

        $scope.activate();
    }
})();
