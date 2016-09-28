import DRAFT_CONSTANTS from './draft-constants';

export default class DraftController {
    constructor(DraftService, $stateParams) {
        this.currentSet = $stateParams.set;
        this.playerCount = DRAFT_CONSTANTS.DEFAULT_PLAYER_COUNT; // For now just support 8 players
        this.DraftService = DraftService;
        this.myPosition = 0;
        this.isDraftStarted = false;

        DraftService.initializeDraft(this.currentSet, this.playerCount).then(() => {
            this.isDraftStarted = true;
            this.myPlayer = DraftService.getMyPlayer(this.myPosition);
            this.myPlayer.isAI = false;
        });
    }

    pickCard(card) {
        if (!card.picked) {
            this.myPlayer.pickCard(card);
        }
    }

    getImageSrc(cardName) {
        const cardSrcUrl = cardName.split(' ').join('_');

        return `http://draftsim.com/Images/${this.currentSet}/${cardSrcUrl}.jpg`;
    }
}
