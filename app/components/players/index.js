import angular from 'angular';

import PlayersService from './players-service';

export default angular.module('ds.components.players', [])

.service('PlayersService', PlayersService);
