import _ from 'lodash';
import DraftConstants from './draft-constants.js';

export default class DraftService {
    constructor(PlayersService, BoosterPackService, $rootScope, setsApi) {
        this.PlayersService = PlayersService;
        this.BoosterPackService = BoosterPackService;
        this.$rootScope = $rootScope;
        this.setsApi = setsApi;

        this.currentPackNumber = 0;
    }

    get currentSet() {
        return this.set;
    }

    getMyPlayer(playerPosition) {
        return this.PlayersService.players[playerPosition];
    }

    initializeDraft(setAbbr, playerCount) {
        // Create playerCount players
        // Each player gets 3 random packs from the set
        return this.setsApi.getSet(setAbbr).then((response) => {
            this.set = response.data;
            this.PlayersService.initializePlayers(playerCount);

            _(this.PlayersService.players).each((player) => {
                _.times(DraftConstants.PACKS_PER_PLAYER, () => {
                    const pack = this.BoosterPackService.createBoosterPack(this.set);

                    player.packs.push(pack);
                });

                player.openPack();
            });
        });
    }
}