import angular from 'angular';
import template from './global-header.html';
import 'angular-ui-router';

import globalHeaderDrawerModule from './global-header-drawer.js';

import GlobalHeaderController from './global-header-controller.js';

export default angular.module('roulette.components.global-header', [
    globalHeaderDrawerModule.name,
    'ui.router'
])

.component('globalHeader', {
    controllerAs: 'globalHeader',
    controller: GlobalHeaderController,
    template
});
