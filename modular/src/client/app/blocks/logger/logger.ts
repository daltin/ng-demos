/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../../typings/toastr/toastr.d.ts" />

'use strict';

module blocks.logger {

    export type LogCall = (message: string, data?: any, title?: string) => void;

    export interface ILogger {
        /**
         * Whether to show toasts when logging.
         */
        showToasts: boolean;

        /**
         * Log an error.
         */
        error: LogCall;
        /**
         * Log information.
         */
        info: LogCall;
        /**
         * Log success.
         */
        success: LogCall;
        /**
         * Log a warning.
         */
        warning: LogCall;

        /**
         * Make a direct log call.
         */
        log: ng.ILogCall;
    }

    class Logger implements ILogger {

        showToasts: boolean;
        log:ng.ILogCall;

        /* @ngInject */
        constructor(private $log:ng.ILogService,
                    private toastr: Toastr) {
            this.log = $log.log;
        }

        error(message: string, data: any, title: string) {
            if(this.showToasts) {
                this.toastr.error(message, title);
            }
            this.$log.error('Error: ' + message, data);
        }

        info(message: string, data: any, title: string) {
            if(this.showToasts) {
                this.toastr.info(message, title);
            }
            this.$log.info('Info: ' + message, data);
        }

        success(message: string, data: any, title: string) {
            if(this.showToasts) {
                this.toastr.success(message, title);
            }

            this.$log.info('Success: ' + message, data);
        }

        warning(message: string, data: any, title: string) {
            if(this.showToasts) {
                this.toastr.warning(message, title);
            }

            this.$log.warn('Warning: ' + message, data);
        }
    }

    (() => {
        angular
            .module('blocks.logger')
            .service('logger', Logger);
    })();
}
