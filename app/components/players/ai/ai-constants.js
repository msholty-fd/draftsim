export default {
    RATING_THRESH: 2.0, //Baseline playability rating for color_commit
    COLOR_COMMIT_THRESHOLD: 3.5, //Determines how many good cards are needed to commit to a color
    TIME_TO_COMMIT: {
        PACK: 2,
        PICK: 4
    }, //Always commit to colors by pack 2 pick 4
    MAX_BONUS_SPEC: .9, //The maximum bonus during the speculation phase at the start of a draft
    ON_COLOR_BONUS: 2.0, //Bonus cards receive after player locks into 2 colors
    OFF_COLOR_PENALTY: -1.0, //Penalty for off color cards after the player locks into 2 colors
    SING_COLOR_BIAS_FACTOR: 2.0, //If the player only has cards of 1 color, reduce the bonus by this fraction
    SECOND_COLOR_FRAC: 0.8, //When committed to one color, the second color bonus is this fraction of the on color bonus
    MULTICOLOR_PENALTY: 0.6, //P1P1 penalty for multicolored cards
    MAX_COMMITMENT_COLORS: 2 // Maximum number of colors a bot will commit to
};
