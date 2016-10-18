import _ from 'lodash';

//import AI_CONSTANTS from './ai-constants.js';

import AI from './ai';

export default class HighestRatingAI extends AI {
    updateCardRatings() {
        const unpickedCards = this.player.currentPack.unpickedCards();

        _.each(unpickedCards, (card) => {

            card.myRating = card.rating;

            // TODO update card bias from AI.js

            // if (this.player.colorCommitment.length >= AI_CONSTANTS.MAX_COMMITMENT_COLORS) {
            //     if (card.isCardOnColor){
            //      cur_bias=ON_COLOR_BONUS;
            //    } else {
            //      cur_bias=-1.0*OFF_COLOR_PENALTY*(off_color_amount-1); //Penalty for off color cards
            //    }
            // } else {

            // }
        });
    }
}
