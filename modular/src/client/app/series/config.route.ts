/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../blocks/router/routehelper.ts" />

(() => {
    'use strict';

    angular
        .module('app.series')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper: blocks.router.IRouteHelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/series',
                config: {
                    templateUrl: 'app/series/series.html',
                    controller: 'Series',
                    controllerAs: 'vm',
                    title: 'series',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Series'
                    }
                }
            }
        ];
    }
})();
