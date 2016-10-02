import angular from 'angular';

import SnackbarService from './snackbar-service';

import SnackbarController from './snackbar-controller';

import template from './snackbar.html';

export default angular.module('ds.components.snackbar', [])

.component('snackbar', {
    controller: SnackbarController,
    controllerAs: 'snackbar',
    template
})

.service('SnackbarService', SnackbarService);
