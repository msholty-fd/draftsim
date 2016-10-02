export default class SealedLiveController {
    constructor(SealedService, $stateParams, PlayersService) {
        this.currentSet = $stateParams.set;
        this.SealedService = SealedService;
        this.isSealedStarted = false;

        SealedService.initializeSealed(this.currentSet).then(() => {
            this.isSealedStarted = true;
            this.myPlayer = PlayersService.players[0];
            this.myPlayer.isAI = false;
            this.SealedService.openPacks();
        });
    }

    addCardToDeck(card) {
        if (!card.picked) {
            card.picked = true;
            this.myPlayer.addCardToDeck(card);
        }
    }

    getImageSrc(cardName) {
        const cardSrcUrl = cardName.split(' ').join('_');

        return `http://draftsim.com/Images/${this.currentSet}/${cardSrcUrl}.jpg`;
    }
}
