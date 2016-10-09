import DRAFT_CONSTANTS from './draft-constants';

export default class DraftController {
    constructor(DraftService, $stateParams, SnackbarService, PlayersService) {
        this.currentSet = $stateParams.set;
        this.playerCount = DRAFT_CONSTANTS.DEFAULT_PLAYER_COUNT; // For now just support 8 players
        this.DraftService = DraftService;
        this.SnackbarService = SnackbarService;
        this.PlayersService = PlayersService;

        this.myPosition = 0;
        this.isDraftStarted = false;

        DraftService.initializeDraft(this.currentSet, this.playerCount).then(() => {
            this.myPlayer = PlayersService.players[this.myPosition];
            this.myPlayer.isAI = false;
        });
    }

    get players() {
        return this.PlayersService.players;
    }

    startDraft() {
        this.DraftService.startDraft();
        this.isDraftStarted = true;
    }

    pickCard(card) {
        if (!card.picked) {
            const message = `Drafted ${card.name}`;

            this.myPlayer.pickCard(card);
            this.SnackbarService.showMessage({
                message,
                timeout: 2000
            });
        }
    }

    addCardToDeck(card) {
        if (!card.inDeck) {
            card.inDeck = true;
            this.SnackbarService.showMessage({
                message: `Added ${card.name} to deck`,
                timeout: 2000
            });
        }
    }

    removeCardFromDeck(card) {
        if (card.inDeck) {
            card.inDeck = false;
            this.SnackbarService.showMessage({
                message: `Removed ${card.name} from deck`,
                timeout: 2000
            });
        }
    }

    getImageSrc(cardName) {
        const cardSrcUrl = cardName.split(' ').join('_');

        return `http://draftsim.com/Images/${this.currentSet}/${cardSrcUrl}.jpg`;
    }
}
