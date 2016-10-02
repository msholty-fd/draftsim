import angular from 'angular';
import globalHeader from './global-header';
import globalFooter from './global-footer';

export default angular.module('ds.components', [
    globalHeader.name,
    globalFooter.name
]);
