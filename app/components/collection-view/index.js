import angular from 'angular';

import template from './collection-view.html';
import CollectionViewController from './collection-view-controller.js';

import magicCardModule from '../magic-card';

export default angular.module('ds.components.collection-view', [
	magicCardModule.name
])

.component('collectionView', {
    controller: CollectionViewController,
    controllerAs: 'collectionView',
    template,
    bindings: {
        collection: '<',
        cardClicked: '&',
        hidePickedCards: '<'
    }
});
