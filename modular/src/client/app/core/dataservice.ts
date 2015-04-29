/// <reference path="../../../../typings/angularjs/angular.d.ts" />

'use strict';

module core.data {
    export interface IDataService {
        getAvengersCast(): ng.IPromise<model.ICastMember[]>;
        getAvengerCount(): ng.IPromise<number>;
        getAvengers(): ng.IPromise<model.IAvenger[]>;
        getComics(): ng.IPromise<model.IComic[]>;
        getSeries(): ng.IPromise<model.ISeries[]>;
        ready(promises?): any;
    }

    class DataService implements IDataService {

        isPrimed = false;
        primePromise;

        /* @ngInject */
        constructor(private $http,
                    private $location,
                    private $q,
                    private exception,
                    private logger) {

        }

        getAvengers() {
            return this.$http.get('/api/maa')
                .then((data) => data.data[0].data.results)
                .catch(function (message) {
                    this.exception.catcher('XHR Failed for getAvengers')(message);
                    this.$location.url('/');
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
            var comics = [];
            return this.$q.when(comics);
        }

        getSeries() {
            var series = [];
            return this.$q.when(series);
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
                .then(function () {
                    return this.$q.all(nextPromises);
                })
                .catch(this.exception.catcher('"ready" function failed'));
        }
    }

    (function () {
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

    }

    export interface ISeries {

    }
}


