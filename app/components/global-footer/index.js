import angular from 'angular';
import template from './global-footer.html';
import GlobalFooterController from './global-footer-controller.js';

export default angular.module('roulette.components.global-footer', [])

.component('globalFooter', {
    controllerAs: 'globalFooter',
    controller: GlobalFooterController,
    template
});
