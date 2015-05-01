/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../blocks/logger/logger.ts" />

'use strict';

module core.data {
    export interface IDataService {
        getAvengersCast(): ng.IPromise<model.ICastMember[]>;
        getAvengerCount(): ng.IPromise<number>;
        getAvengers(): ng.IPromise<model.IAvenger[]>;
        getComics(): ng.IPromise<model.IComic[]>;
        getMovies(): ng.IPromise<model.IMovie[]>;
        ready(promises?): any;
    }

    class DataService implements IDataService {

        isPrimed = false;
        primePromise;

        /* @ngInject */
        constructor(private $http: ng.IHttpService,
                    private $location: ng.ILocationService,
                    private $q: ng.IQService,
                    private exception,
                    private logger: blocks.logger.ILogger) {

        }

        getAvengers() {
            return this.$http.get<model.IAvenger[]>('/api/maa')
            .then(data => data.data)
            .catch((message) => {
                    this.exception.catcher('XHR Failed for getAvengers')(message);
                    this.$location.url('/');
                    return <model.IAvenger[]>[];
                });
        }

        getAvengerCount() {
            var count = 0;
            return this.getAvengersCast()
                .then((data) => {
                    count = data.length;
                    return this.$q.when(count);
                })
                .catch(this.exception.catcher('XHR Failed for getAvengerCount'));
        }

        getAvengersCast() {
            var cast = [
                {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
                {name: 'Chris Hemsworth', character: 'Thor'},
                {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
                {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
                {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
                {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
                {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
                {name: 'Samuel L. Jackson', character: 'Nick Fury'},
                {name: 'Paul Bettany', character: 'Jarvis'},
                {name: 'Tom Hiddleston', character: 'Loki'},
                {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
            ];
            return this.$q.when(cast);
        }

        getComics() {
            return this.$http.get<model.IComic[]>('/api/comics')
            .then(data => data.data)
            .catch((message) => {
                    this.exception.catcher('XHR Failed for getComics')(message);
                    this.$location.url('/');
                    return <model.IComic[]>[];
                });
        }

        getMovies() {
            return this.$http.get<model.IMovie[]>('/api/movies')
            .then(data => data.data)
            .catch((message) => {
                    this.exception.catcher('XHR Failed for getMovies')(message);
                    this.$location.url('/');
                    return <model.IMovie[]>[];
                });
        }

        private prime() {
            // This function can only be called once.
            if (this.primePromise) {
                return this.primePromise;
            }

            this.primePromise = this.$q.when(true).then(() => {
                this.isPrimed = true;
                this.logger.info('Primed data');
            });
            return this.primePromise;
        }

        ready(nextPromises) {
            var readyPromise = this.primePromise || this.prime();

            return readyPromise
                .then(() => {
                    return this.$q.all(nextPromises);
                })
                .catch(this.exception.catcher('"ready" function failed'));
        }
    }

    (() => {
        angular
            .module('app.core')
            .service('dataservice', DataService);
    })();
}

module core.model {
    export interface ICastMember {
        name: string;
        character: string;
    }

    export interface IAvenger {

    }

    export interface IComic {
        name: string;
        coverUrl: string;
    }

    export interface IMovie {
	   name: string;
       coverUrl: string;
       releaseDate: Date;
    }
}


