/// <reference path="../../../../typings/angularjs/angular.d.ts" />

(function() {
    'use strict';

    angular
        .module('app.comics')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/comics',
                config: {
                    templateUrl: 'app/comics/comics.html',
                    controller: 'Comics',
                    controllerAs: 'vm',
                    title: 'comics',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-book"></i> Comics'
                    }
                }
            }
        ];
    }
})();
