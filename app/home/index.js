import angular from 'angular';
import 'angular-ui-router';

import HomeController from './home-controller.js';

import template from './home.html';

export default angular.module('roulette.home', [
    'ui.router'
])

.config(function($urlRouterProvider, $stateProvider) {
    'ngInject';
    $urlRouterProvider.when('', '/');

    $stateProvider
        .state('home', {
            url: '/',
            controllerAs: 'home',
            controller: HomeController,
            template
        });
});
