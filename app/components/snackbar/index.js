import angular from 'angular';

import SnackbarService from './snackbar-service';

import template from './snackbar.html';

export default angular.module('ds.components.snackbar', [])

.component('snackbar', {
    template
})

.service('SnackbarService', SnackbarService);
