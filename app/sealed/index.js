import angular from 'angular';
import 'angular-ui-router';

import playersModule from '../components/players';
import boosterPackModule from '../components/booster-pack';
import apiModule from '../components/api';

import SealedHomeController from './sealed-home-controller.js';
import SealedLiveController from './sealed-live-controller.js';
import SealedService from './sealed-service.js';

import sealedHomeTemplate from './sealed-home.html';
import sealedLiveController from './sealed.html';

export default angular.module('ds.sealed', [
    'ui.router',
    playersModule.name,
    boosterPackModule.name,
    apiModule.name
])

.config(function($urlRouterProvider, $stateProvider) {
    'ngInject';

    $stateProvider
        .state('sealedHome', {
            url: '/sealed',
            controllerAs: 'sealedHome',
            controller: SealedHomeController,
            template: sealedHomeTemplate
        })
        .state('sealedLive', {
            url: '/sealed/:set',
            controllerAs: 'sealedLive',
            controller: SealedLiveController,
            template: sealedLiveController
        });
})

.service('SealedService', SealedService);
