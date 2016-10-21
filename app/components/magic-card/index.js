import angular from 'angular';

import MagicCardController from './magic-card-controller';
import template from './magic-card.html';

export default angular.module('ds.components.magic-card', [])

.component('magicCard', {
	controller: MagicCardController,
    controllerAs: 'MagicCardController',
    template,
    bindings: {
        card: '<',
        showStats: '<',
        cardClicked: '&'
    }
});
