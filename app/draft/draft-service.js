import _ from 'lodash';

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

    initializeDraft(setAbbr) {
        this.setAbbr = setAbbr;
    }

    startDraft() {
        return this.setsApi.getSet(this.setAbbr).then((response) => {
            this.set = response.data;
            this.BoosterPackService.setSet(this.setAbbr, this.set);

            // Each player gets 3 random packs from the set
            _(this.PlayersService.players).each((player) => {
                _.each(this.set.limited.draft, (set) => {
                    const pack = this.BoosterPackService.createBoosterPack(set);

                    player.packs.push(pack);
                });

                //player.openPack();
            });
        });
    }
}
