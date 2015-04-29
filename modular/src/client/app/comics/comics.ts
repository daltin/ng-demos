/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../blocks/logger/logger.ts" />
/// <reference path="../core/dataservice.ts" />

(function() {
    'use strict';

    angular
        .module('app.comics')
        .controller('Comics', Comics);

    /* @ngInject */
    function Comics(dataservice: core.data.IDataService,
                    logger: blocks.logger.ILogger) {
        var vm = this;
        vm.series = [];
        vm.title = 'Comics';

        activate();

        function activate() {
            return getComics().then(function() {
                logger.info('Activated Comics View');
            });
        }

        function getComics() {
            return dataservice.getComics().then(function(data) {
                vm.comics = data;
                return vm.comics;
            });
        }
    }
})();
