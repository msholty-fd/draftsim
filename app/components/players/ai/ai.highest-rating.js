import AI from './ai';
import _ from 'lodash';

export default class HighestRatingAI extends AI {
	updateCardRatings() {
		const unpickedCards = this.player.currentPack.unpickedCards();

		_.each(unpickedCards, (card) => {
			card.myRating = card.rating;
		});
	}
}
