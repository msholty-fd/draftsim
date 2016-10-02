import _ from 'lodash';

export default class SealedService {
    constructor(setsApi, PlayersService, BoosterPackService) {
        this.myPlayer = null;
        this.setsApi = setsApi;
        this.PlayersService = PlayersService;
        this.BoosterPackService = BoosterPackService;
    }

    initializeSealed(setAbbr) {
        return this.setsApi.getSet(setAbbr).then((response) => {
            this.set = response.data;
            this.BoosterPackService.setSet(setAbbr, this.set);

            this.PlayersService.initializePlayers(1);
            this.myPlayer = this.PlayersService.players[0];

            _.each(this.set.limited.sealed, (set) => {
                const boosterPack = this.BoosterPackService.createBoosterPack(set);

                this.myPlayer.packs.push(boosterPack);
            });
        });
    }

    openPacks() {
        _.each(this.myPlayer.packs, (pack) => {
            this.myPlayer.collection.push(...pack.cards);
        });
    }

    getImageSrc(cardName) {
        const cardSrcUrl = cardName.split(' ').join('_');

        return `http://draftsim.com/Images/${this.currentSet}/${cardSrcUrl}.jpg`;
    }
}
