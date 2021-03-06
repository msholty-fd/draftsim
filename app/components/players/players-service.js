import _ from 'lodash';
import Player from './player';
import AIs from './ai';

export default class PlayersService {
    constructor($rootScope, $interval) {
        this.$rootScope = $rootScope;
        this.$interval = $interval;

        this.packCompleteCount = 0;
        this.roundCompleteCount = 0;
        this.passDirections = ['left', 'right', 'left'];
        this.PACKS_PER_PLAYER = 3;

        this.initializePlayers();

        $rootScope.$on('player:pack-complete', () => {
            this.packCompleteCount++;

            // If all players are done with this pack round, everyone opens a new pack
            if (this.packCompleteCount === this.players.length) {
                this.roundCompleteCount++;
                this.packCompleteCount = 0;

                if (this.roundCompleteCount <= this.PACKS_PER_PLAYER) {
                    _(this.players).each((player) => {
                        if (player.packs.length) {
                            player.openPack();
                        }
                    });
                } else {
                    _(this.players).each((player) => {
                        player.AI.endAI();
                    });
                }
            }
        });
    }

    initializePlayers(playerCount) {
        this.players = [];

        _.times(playerCount, (index) => {
            const newPlayer = this.getNewPlayer(index);

            this.players.push(newPlayer);
            this.$rootScope.$on(`player:${index}:pass-pack`, (event, params) => {
                this.passPack(params.pack, params.position);
            });
        });
    }

    startPlayers() {
        _.each(this.players, (player) => {
            player.AI = new AIs['HighestRatingAI'](player, this.$interval);
            player.openPack();
            if (player.isAI) {
                player.AI.startAI();
            }
        });
    }

    passPack(pack, position) {
        const direction = this.passDirections[this.currentPackIndex];
        let passTarget = direction === 'left' ? position - 1 : position + 1;

        if (passTarget < 0) {
            passTarget = this.players.length - 1;
        } else if (passTarget >= this.players.length) {
            passTarget = 0;
        }

        this.players[passTarget].receivePack(pack);
    }

    getNewPlayer(index) {
        return new Player(this.$rootScope, this.$interval, index);
    }
}
