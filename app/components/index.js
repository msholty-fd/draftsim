import angular from 'angular';
import globalHeader from './global-header';
import globalFooter from './global-footer';

export default angular.module('roulette.components', [
    globalHeader.name,
    globalFooter.name
]);
