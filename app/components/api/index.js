import angular from 'angular';

import setsApi from './sets.js';

export default angular.module('ds.components.api', [])

.service('setsApi', setsApi);
