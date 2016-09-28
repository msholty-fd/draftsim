import angular from 'angular';
import 'angular-ui-router';

import playersModule from '../components/players';
import boosterPackModule from '../components/booster-pack';
import apiModule from '../components/api';

import DraftController from './draft-controller.js';
import DraftHomeController from './draft-home-controller.js';
import DraftService from './draft-service.js';

import draftHomeTemplate from './draft-home.html';
import draftTemplate from './draft.html';

export default angular.module('ds.draft', [
    'ui.router',
    playersModule.name,
    boosterPackModule.name,
    apiModule.name
])

.config(function($urlRouterProvider, $stateProvider) {
    'ngInject';

    $stateProvider
        .state('draftHome', {
            url: '/draft',
            controllerAs: 'draftHome',
            controller: DraftHomeController,
            template: draftHomeTemplate
        })
        .state('draftLive', {
            url: '/draft/:set',
            controllerAs: 'draftLive',
            controller: DraftController,
            template: draftTemplate
        });
})

.service('DraftService', DraftService);
