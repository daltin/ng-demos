/// <reference path="../core/dataservice.ts" />
/// <reference path="../blocks/logger/logger.ts" />
import model = core.model;

module app.series {
    'use strict';

    class Series {
        series:model.ISeries[] = [];
        title = 'Series';

        /* @ngInject */
        constructor(private dataservice:core.data.IDataService,
                    private logger:blocks.logger.ILogger) {
            this.activate();
        }

        private activate() {
            return this.getSeries().then(() => {
                this.logger.info('Activated Series View');
            });
        }

        private getSeries() {
            return this.dataservice.getSeries()
                .then((data:model.ISeries[]) => {
                    this.series = data;
                    return this.series;
                });
        }
    }

    angular
        .module('app.series')
        .controller('Series', Series);
}
