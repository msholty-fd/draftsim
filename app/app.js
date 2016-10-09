import angular from 'angular';

import 'angular-ui-router';

import componentsModule from './components';
import homeModule from './home';
import draftModule from './draft';
import sealedModule from './sealed';

import NotFoundTemplate from './404.html';

angular.module('ds', [
    componentsModule.name,
    homeModule.name,
    draftModule.name,
    sealedModule.name,
    'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('404', {
        template: NotFoundTemplate
    });

    $urlRouterProvider.otherwise(function($injector, $location) {
        $injector.get('$state').go('404');
        return $location.path();
    });
})

.config(function($locationProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
})

.run(function($rootScope, $state, $timeout) {
    'ngInject';

    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.currentStateName = $state.current.name;
        $timeout(() => updateMdl());
    });

    $rootScope.$on('$viewContentLoaded', () => updateMdl());
});

function updateMdl() {
    componentHandler.upgradeAllRegistered(); // eslint-disable-line no-undef
}
