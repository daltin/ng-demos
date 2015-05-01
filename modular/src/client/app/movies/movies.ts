/// <reference path="../core/dataservice.ts" />
/// <reference path="../blocks/logger/logger.ts" />
import model = core.model;

module app.movies {
    'use strict';

    class Movies {
        movies:model.IMovie[] = [];
        title = 'Movies';

        /* @ngInject */
        constructor(private dataservice:core.data.IDataService,
                    private logger:blocks.logger.ILogger) {
            this.activate();
        }

        private activate() {
            return this.getMovies().then(() => {
                this.logger.info('Activated Movies View');
            });
        }

        private getMovies() {
            return this.dataservice.getMovies()
                .then((data:model.IMovie[]) => {
                    this.movies = data;
                    return this.movies;
                });
        }
    }

    angular
        .module('app.movies')
        .controller('Movies', Movies);
}
