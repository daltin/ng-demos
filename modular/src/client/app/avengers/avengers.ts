/// <reference path="../../../../typings/angularjs/angular.d.ts" />

(function() {
    'use strict';

    angular
        .module('app.avengers')
        .controller('Avengers', Avengers);

    /* @ngInject */
    function Avengers(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers';

        activate();

        function activate() {
            return getAvengers().then(function() {
                logger.info('Activated Avengers View');
            });
        }

        function getAvengers() {
            return dataservice.getAvengers().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
        
        function furryStuff(furlessParam, furryParam = true) {
            // reading the type notations: 
            //      myVar: someType
            //      myArray: [] or myArray: someType[]
            //      myFunc(myParam: someType): returnType
            //      myFunc(myParam: someType, optionalParam?: someType): returnType
            //      myFunc(callbackfn: (callbackParam: someType) => callBackFuncReturnType): myFuncReturnType
                    // don't freak out about generics. just ignore them if they bother you
            //      myFunc<someType>(myParam: someType): returnType
            // Basic types:
            //      boolean
            //      number
            //      string
            //      []
            // Other types:
            //      Date
            //      any
            //      void
            //      {}
            
            // variable type inference - initialize during declaration
            var fur = 'furry';
            //fur = true;
            
            // parameter type inference - set a default value
            //furryParam = 'hairy'
            var amIFurry = furryParam;
            
            var hairs = 'Lots of hair, almost to the point of being fur-like';
            // lib.d.ts, parameter list, optional parameters
            hairs.split(',');
            
            
            // date inference
            var someFurryDate = new Date();
            someFurryDate.setHours(1);
            
            // number inference
            var someFurryNumber = Date.now();
            someFurryNumber.toPrecision(3);
            
            // using math
            var thePowerInFur = Math.pow(2,16);
            
            // infer array only
            var furryArray = [];
            furryArray.push(1, 'coat', true, new Date());
            
            // infers both array and string            
            var furryDogs = ['spot','rover','fido'];
            
            // callback 
            furryDogs.filter(function (dogName) { return dogName.length > 5});
            
            
            // what if I don't want to infer, want dynamic?
            // does not infer
            var noFur;
            noFur = 'bereft';
            noFur = true;
            noFur = 42;
            noFur = new Date();
            
            furlessParam = {very: 'smooth'};
            furlessParam = true;
            
            // infers any
            var stillNoFur = undefined;
            stillNoFur = true;
            stillNoFur = [];
            
            var againNoFur = null;
            againNoFur = 'loose';
            againNoFur = {isLoose: true};
            
            // infers {}
            var infersNoFur = {};
            infersNoFur = true;
            infersNoFur = 'none';
            
            // angular type help
            // back to top
            
            // summary
            // OPT IN!
            // baby step 1 - Plain Old JavaScript
            // - Change file extension
            // - Use type inference
            // - Import type libraries
        }
    }
})();
