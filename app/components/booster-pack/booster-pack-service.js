import _ from 'lodash';
import BoosterPack from './booster-pack.js';

export default class BoosterPackService {
    createBoosterPack(set) {
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

            const cardOptions = setGroupedByRarity[rarityKey];

            if (cardOptions) {
                const randomCard = this.getRandomCard(cardOptions);

                boosterPack.cards.push(_.clone(randomCard));
            }

        });

        return boosterPack;
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