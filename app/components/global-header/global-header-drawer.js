import angular from 'angular';
import template from './global-header-drawer.html';

import GlobalHeaderController from './global-header-controller.js';

export default angular.module('roulette.components.global-header-drawer', [])

.component('globalHeaderDrawer', {
    controllerAs: 'globalHeaderDrawer',
    controller: GlobalHeaderController,
    template
});
