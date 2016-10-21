import DraftController from './draft-controller.js';

describe('DraftController', function() {
    beforeEach(function() {
        this.DraftService = jasmine.createSpyObj('DraftService', ['initializeDraft']);
        this.$stateParams = {
            currentSet: 'ABC'
        };
        this.SnackbarService = jasmine.createSpyObj('SnackbarService', ['showMessage']);
        this.PlayersService = jasmine.createSpyObj('PlayersService', ['initializePlayers', 'addPlayer', 'removePlayer']);
        this.PlayersService.players = [
            {
                name: 'fake player 1'
            }
        ];

        this.initializeController = function() {
            this.controller = new DraftController(this.DraftService, this.$stateParams, this.SnackbarService, this.PlayersService);
        };
        this.initializeController();
    });

    describe('#constructor', function() {
        it('should initialize the players and draft', function() {
            expect(this.PlayersService.initializePlayers).toHaveBeenCalled();
            expect(this.DraftService.initializeDraft).toHaveBeenCalled();
        });

        it('should set player 1 to non AI', function() {
            expect(this.PlayersService.players[0].isAI).toBe(false);
        });
    });

    describe('#addPlayer', function() {
        it('should add the player', function() {
            this.controller.addPlayer();
            expect(this.PlayersService.addPlayer).toHaveBeenCalled();
        });
    });

    describe('#removePlayer', function() {
        it('should remove the player at the given index', function() {
            const index = 1;

            this.controller.removePlayer(index);
            expect(this.PlayersService.removePlayer).toHaveBeenCalledWith(1);
        });
    });

    describe('#pickCard', function() {
        beforeEach(function() {
            this.controller.myPlayer = jasmine.createSpyObj('myPlayer', ['pickCard']);
        });

        it('should not pick a card if the card is already picked', function() {
            const pickedCard = { picked: true };

            this.controller.pickCard(pickedCard);
            expect(this.controller.myPlayer.pickCard).not.toHaveBeenCalled();
        });

        it('should pick the card if the card hasn\'t been picked', function() {
            const card = { picked: false };

            this.controller.pickCard(card);
            expect(this.controller.myPlayer.pickCard).toHaveBeenCalledWith(card);
        });

        it('should send a snackbar message when the card has been picked', function() {
            const name = 'Nissa, Vital Force';
            const card = { name };

            this.controller.pickCard(card);
            expect(this.controller.SnackbarService.showMessage).toHaveBeenCalledWith({
                message: `Drafted ${name}`,
                timeout: 2000
            });
        });
    });

    describe('#addCardToDeck', function() {
        it('should not add a card to deck if it is in the deck already', function() {
            const card = { inDeck: true };

            this.controller.addCardToDeck(card);
            expect(this.SnackbarService.showMessage).not.toHaveBeenCalled();
        });

        it('should add the card if it isn\'t in the deck currently', function() {
            const card = { inDeck: false };

            this.controller.addCardToDeck(card);
            expect(card.inDeck).toBe(true);
            expect(this.SnackbarService.showMessage).toHaveBeenCalled();
        });
    });
});
