import _ from 'lodash';

import AI_CONSTANTS from './ai-constants.js';

import AI from './ai';

export default class HighestRatingAI extends AI {
    updateCardRatings() {
        const unpickedCards = this.player.currentPack.unpickedCards();
        const commitedColors = _.filter(this.player.colorCommitment.colors, (color) => {
            return this.player.colorCommitment[color] > AI_CONSTANTS.COLOR_COMMIT_THRESHOLD;
        });
        const speculatedColors = _.filter(this.player.commitedColors, (commitment) => {
            return commitment > 0;
        });

        const highestSpeculatedColor = _.max(_.keys(this.player.commitedColors), (color) => this.player.commitedColors[color]);
        const secondHighestSpeculatedColor = _.max(_.keys(_.omit(this.player.commitedColors, highestSpeculatedColor)), (color) => this.player.commitedColors[color]);
        const denom = AI_CONSTANTS.COLOR_COMMIT_THRESHOLD / AI_CONSTANTS.MAX_BONUS_SPEC;

        _.each(unpickedCards, (card) => {
            let bias = 0;

            card.myRating = card.rating;

            if (commitedColors.length >= AI_CONSTANTS.MAX_COMMITMENT_COLORS) {
                bias = this.isCardOnColor(card) ? AI_CONSTANTS.ON_COLOR_BONUS : AI_CONSTANTS.OFF_COLOR_PENALTY;
            } else {
                if (!card.colors || card.colors.length === 0) {
                    if (speculatedColors.length > 1) {
                        bias = _.min([AI_CONSTANTS.COLOR_COMMIT_THRESHOLD, this.player.colorCommitment[highestSpeculatedColor]]) / denom;
                    }
                } else if (card.colors.length === 1) {
                    const color = card.color[0];

                    bias = _.min([AI_CONSTANTS.COLOR_COMMIT_THRESHOLD, this.player.commitedColors[color]]) / denom;
                    //Case 2b: if only has cards of one color, reduce bias by factor SING_COLOR_BIAS_FACTOR
                    if (speculatedColors.length === 1) {
                        bias = bias / AI_CONSTANTS.SING_COLOR_BIAS_FACTOR;
                    }

                    //If committed to one color, give a bonus to the best second color
                    if (commitedColors.length === 1 && color === secondHighestSpeculatedColor && this.player.commitedColors[color] > 0) {
                        bias = _.max([AI_CONSTANTS.SECOND_COLOR_FRAC * AI_CONSTANTS.COLOR_COMMIT_THRESHOLD / denom, bias]);
                    }
                } else if (card.colors.length === 2 || card.colors.length === 3) {
                    const onColorShared = _.intersection(_.keys(this.player.commitedColors), card.colors).length;

                    bias = onColorShared / denom - AI_CONSTANTS.MULTICOLOR_PENALTY;
                } else if (card.colors >= 4) {
                    bias = 0;
                }
            }

            card.myRating += bias;
        });
    }
}
