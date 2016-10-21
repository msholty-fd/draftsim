import DRAFT_CONSTANTS from './draft-constants';

export default class DraftController {
    constructor(DraftService, $stateParams, SnackbarService, PlayersService) {
        this.currentSet = $stateParams.set;
        this.DraftService = DraftService;
        this.SnackbarService = SnackbarService;
        this.PlayersService = PlayersService;

        this.myPosition = 0;
        this.isDraftStarted = false;

        PlayersService.initializePlayers(DRAFT_CONSTANTS.DEFAULT_PLAYER_COUNT);
        DraftService.initializeDraft(this.currentSet);
        PlayersService.players[this.myPosition].isAI = false; // my player is not a robot
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
        this.DraftService.startDraft().then(() => {
            this.PlayersService.startPlayers();
            this.myPlayer = this.PlayersService.players[this.myPosition];
            this.isDraftStarted = true;
        });
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
}
