import angular from 'angular';

import template from './collection-view.html';
import CollectionViewController from './collection-view-controller.js';

export default angular.module('ds.components.collection-view', [])

.component('collectionView', {
    controller: CollectionViewController,
    controllerAs: 'collectionView',
    template,
    bindings: {
        collection: '<',
        currentSet: '<'
    }
});
