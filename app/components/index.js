import angular from 'angular';
import snackbarModule from './snackbar';
import globalHeaderModule from './global-header';
import globalFooterModule from './global-footer';

export default angular.module('ds.components', [
    snackbarModule.name,
    globalHeaderModule.name,
    globalFooterModule.name
]);
