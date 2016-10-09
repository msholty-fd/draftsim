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

    initializeDraft(setAbbr, playerCount) {
        // Create playerCount players
        // Each player gets 3 random packs from the set
        return this.setsApi.getSet(setAbbr).then((response) => {
            this.set = response.data;
            this.BoosterPackService.setSet(setAbbr, this.set);
            this.PlayersService.initializePlayers(playerCount);

            _(this.PlayersService.players).each((player) => {
                _.each(this.set.limited.draft, (set) => {
                    const pack = this.BoosterPackService.createBoosterPack(set);

                    player.packs.push(pack);
                });

                player.openPack();
            });
        });
    }

    startDraft() {
        this.PlayersService.startDraft();
    }
}
