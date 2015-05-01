/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../blocks/router/routehelper.ts" />

(() => {
    'use strict';

    angular
        .module('app.movies')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper: blocks.router.IRouteHelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/movies',
                config: {
                    templateUrl: 'app/movies/movies.html',
                    controller: 'Movies',
                    controllerAs: 'vm',
                    title: 'movies',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-film"></i> Movies'
                    }
                }
            }
        ];
    }
})();
