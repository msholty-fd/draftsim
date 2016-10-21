import _ from 'lodash';
import BoosterPack from './booster-pack.js';

export default class BoosterPackService {
    constructor() {
        this.sets = [];
    }

    createBoosterPack(setAbbr) {
        const set = this.sets[setAbbr];
        const boosterPack = new BoosterPack();
        const setGroupedByRarity = _.groupBy(set.cards, (card) => {
            return _.toLower(card.rarity);
        });

        const isMythicPack = this.isMythicRare();

        _.forEach(set.booster, (rarity) => {
            let rarityKey = rarity;

            if (_.isObject(rarity)) {
                rarityKey = isMythicPack ? 'mythic rare' : 'rare';
            }

            const cardChoices = setGroupedByRarity[rarityKey];

            if (cardChoices) {
                const randomCard = this.getRandomCard(cardChoices);

                randomCard.setAbbr = setAbbr;
                boosterPack.cards.push(_.clone(randomCard));
            }

        });

        return boosterPack;
    }

    setSet(setAbbr, set) {
        this.sets[setAbbr] = set;
    }

    getSet(setAbbr) {
        return this.sets[setAbbr];
    }

    // TODO: do not add duplicate cards to a pack unless its a foil
    // Add random foils
    getRandomCard(cards) {
        if (cards.length === 0) {
            return {};
        }

        const randomCardIndex = _.random(0, cards.length - 1);

        return cards[randomCardIndex];
    }

    isMythicRare() {
        // 1 out of 8 chance
        return _.random(1, 8) === 1;
    }
}
