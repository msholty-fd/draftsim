import DRAFT_CONSTANTS from './draft-constants';

export default class DraftController {
    constructor(DraftService, $stateParams, SnackbarService) {
        this.currentSet = $stateParams.set;
        this.playerCount = DRAFT_CONSTANTS.DEFAULT_PLAYER_COUNT; // For now just support 8 players
        this.DraftService = DraftService;
        this.SnackbarService = SnackbarService;

        this.myPosition = 0;
        this.isDraftStarted = false;

        DraftService.initializeDraft(this.currentSet, this.playerCount).then(() => {
            this.myPlayer = DraftService.getMyPlayer(this.myPosition);
            DraftService.startDraft();
            this.isDraftStarted = true;
        });
    }

    pickCard(card) {
        if (!card.picked) {
            this.myPlayer.pickCard(card);
        }

        this.showDraftSnackbar(card);
    }

    getImageSrc(cardName) {
        const cardSrcUrl = cardName.split(' ').join('_');

        return `http://draftsim.com/Images/${this.currentSet}/${cardSrcUrl}.jpg`;
    }

    showDraftSnackbar(card) {
        const message = `Drafted ${card.name}`;
        const handler = function() {
            console.log('handler function');
        };

        this.SnackbarService.showMessage({
            message,
            timeout: 2000,
            actionHandler: handler,
            actionText: 'Undo'
        });
    }
}
