import _ from 'lodash';

export default class Player {
    constructor($rootScope, $interval, position) {
        this.collection = [];
        this.packs = [];
        this.currentPack = null;
        this.currentPackIndex = -1;
        this.currentPickIndex = 0;
        this.packQueue = []; // where packs go if player isn't done drafting a card from current pack
        this.deck = [];
        this.AI = null;
        this.isAI = true;
        this.colorCommitment = {
            White: 0,
            Black: 0,
            Blue: 0,
            Green: 0,
            Red: 0
        };

        this.position = position;
        this.$rootScope = $rootScope;
        this.$interval = $interval;
    }

    pickCard(card) {
        const pack = this.currentPack;

        this.collection.push(card);
        this.currentPickIndex++;
        card.picked = true;
        this.currentPack = null;

        this.passPack(pack);
    }

    addCardToDeck(card) {
        this.deck.push(card);
    }

    removeCardFromDeck(index) {
        this.deck.splice(index, 1);
    }

    pickRandomCard() {
        const unpickedCards = this.currentPack.unpickedCards();
        const randomCardIndex = _.random(0, unpickedCards.length - 1);
        const randomCard = unpickedCards[randomCardIndex];

        this.pickCard(randomCard);
    }

    passPack(pack) {
        // Pack is done
        if (pack.unpickedCards().length === 0) {
            this.$rootScope.$broadcast('player:pack-complete', {
                position: this.position
            });
        } else {
            // Pack still has cards, pass it
            this.$rootScope.$broadcast(`player:${this.position}:pass-pack`, {
                pack,
                position: this.position
            });

            // After passing, check to see if there is a pack waiting in your queue
            this.takePackFromQueue();
        }
    }

    receivePack(pack) {
        if (!this.currentPack) {
            this.currentPack = pack;
        } else {
            this.packQueue.push(pack);
        }
    }

    openPack() {
        this.currentPack = this.packs.splice(0, 1)[0];
        this.currentPickIndex = 0;
        this.currentPackIndex++;
        this.AI.updateCardRatings();
    }

    takePackFromQueue() {
        if (this.packQueue.length) {
            this.currentPack = this.packQueue.splice(0, 1)[0];
            this.AI.updateCardRatings();
        }
    }
}
