/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../logger/logger.ts" />

module blocks.router {
    'use strict';

    // Must configure via the routehelperConfigProvider
    class RouteHelperConfig implements ng.IServiceProvider {
        /* jshint validthis:true */
        config: {
            $routeProvider?;
            docTitle?: string;
            resolveAlways?: { ready(): void }
        } = { };

        $get() {
            return {
                config: this.config
            };
        }
    }

    export interface IRouteHelper {
        routeCounts: { errors: number; changes: number; };

        configureRoutes(routes): void;
        getRoutes(): any;
    }

    class RouteHelper implements IRouteHelper {
        private handlingRouteChangeError = false;
        routeCounts = {
            errors: 0,
            changes: 0
        };
        private routes = [];
        private $routeProvider;

        /* @ngInject */
        constructor(private $location: ng.ILocationService,
                    private $rootScope: ng.IRootScopeService,
                    private $route: ng.route.IRouteService,
                    private logger: blocks.logger.ILogger,
                    private routehelperConfig: RouteHelperConfig) {
            this.init();
            this.$routeProvider = routehelperConfig.config.$routeProvider;
        }

        configureRoutes(routes) {
            routes.forEach((route) => {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, this.routehelperConfig.config.resolveAlways);
                this.$routeProvider.when(route.url, route.config);
            });
            this.$routeProvider.otherwise({redirectTo: '/'});
        }

        getRoutes() {
            for (var prop in this.$route.routes) {
                if (this.$route.routes.hasOwnProperty(prop)) {
                    var route = this.$route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        this.routes.push(route);
                    }
                }
            }
            return this.routes;
        }
        ///////////////

        private handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            this.$rootScope.$on('$routeChangeError',
                (event, current, previous, rejection) => {
                    if (this.handlingRouteChangeError) {
                        return;
                    }
                    this.routeCounts.errors++;
                    this.handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    this.logger.warning(msg, [current]);
                    this.$location.path('/');
                }
            );
        }

        private init() {
            this.handleRoutingErrors();
            this.updateDocTitle();
        }

        private updateDocTitle() {
            this.$rootScope.$on('$routeChangeSuccess',
                (event, current) => {
                    this.routeCounts.changes++;
                    this.handlingRouteChangeError = false;
                    var title = this.routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    (<any>this.$rootScope).title = title; // data bind to <title>
                }
            );
        }
    }

    angular
        .module('blocks.router')
        .provider('routehelperConfig', RouteHelperConfig)
        .service('routehelper', RouteHelper);
}
