import _ from 'lodash';

import AI from './ai';

export default class HighestRatingAI extends AI {
    chooseCard() {
        const unpickedCards = this.player.currentPack.unpickedCards();
        const bestCardToTake = _.maxBy(unpickedCards, function(card) {
            return card.rating;
        });

        return bestCardToTake;
    }
}
