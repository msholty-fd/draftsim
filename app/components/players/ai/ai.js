import AI_CONSTANTS from './ai-constants';

export default class AI {
    constructor(player, $interval) {
        this.player = player;
        this.$interval = $interval;
    }

    startAI() {
        this.interval = this.$interval(() => {
            if (this.player.currentPack) {
                this.player.pickCard(this.chooseCard());
            } else if (this.player.packQueue.length) {
                this.player.takePackFromQueue();
            }
        }, 100);
    }

    endAI() {
        this.interval.cancel();
    }

    getHighestRatedCard() {
        const unpickedCards = this.player.currentPack.unpickedCards();
        const bestCardToTake = _.maxBy(unpickedCards, function(card) {
            return card.rating;
        });

        return bestCardToTake;
    }

    chooseCard() {
        this.updateCardRatings();
        const highestRatedCard = this.getHighestRatedCard();

        this.updateColorCommitment(highestRatedCard);

        return highestRatedCard;
    }

    updateCardRatings() {
        return {};
    }

    updateColorCommitment(card) {
        _.each(card.colorIdentity, (color) => {
            this.player.colorCommitment[color] += (card.rating - AI_CONSTANTS.RATING_THRESH) || 0;
        });
    }

    isCardOnColor(card) {
        let isCardOnColor = !card.colors; // colorless cards are on color by default

        _.each(card.colors, (color) => {
            if (this.player.colorCommitment[color] > 0) {
                isCardOnColor = true;
            }
        });

        return isCardOnColor;
    }
}
