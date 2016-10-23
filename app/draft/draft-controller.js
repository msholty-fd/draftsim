import DRAFT_CONSTANTS from './draft-constants';

export default class DraftController {
    constructor(DraftService, $stateParams, SnackbarService, PlayersService) {
        this.DraftService = DraftService;
        this.currentSet = $stateParams.set;
        this.SnackbarService = SnackbarService;
        this.PlayersService = PlayersService;

        this.myPosition = 0;
        this.isDraftStarted = false;

        PlayersService.initializePlayers(DRAFT_CONSTANTS.DEFAULT_PLAYER_COUNT);
        PlayersService.players[this.myPosition].isAI = false; // my player is not a robot

        this.myPlayer = this.PlayersService.players[this.myPosition];
    }

    get players() {
        return this.PlayersService.players;
    }

    addPlayer() {
        this.PlayersService.addPlayer();
    }

    removePlayer(index) {
        this.PlayersService.removePlayer(index);
    }

    startDraft() {
        this.DraftService.startDraft(this.currentSet).then(() => {
            this.PlayersService.startPlayers();
            this.isDraftStarted = true;
        });
    }

    pickCard(card) {
        if (!card.picked) {
            const message = `Drafted ${card.name}`;
            const timeout = DRAFT_CONSTANTS.SNACKBAR_TOAST_TIMEOUT;

            this.myPlayer.pickCard(card);
            this.SnackbarService.showMessage({ message, timeout });
        }
    }

    addCardToDeck(card) {
        if (!card.inDeck) {
            card.inDeck = true;
            this.SnackbarService.showMessage({
                message: `Added ${card.name} to deck`,
                timeout: DRAFT_CONSTANTS.SNACKBAR_TOAST_TIMEOUT
            });
        }
    }

    removeCardFromDeck(card) {
        if (card.inDeck) {
            card.inDeck = false;
            this.SnackbarService.showMessage({
                message: `Removed ${card.name} from deck`,
                timeout: DRAFT_CONSTANTS.SNACKBAR_TOAST_TIMEOUT
            });
        }
    }
}
