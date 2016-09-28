import _ from 'lodash';

export default class Player {
    constructor($rootScope, $interval, position) {
        this.collection = [];
        this.packs = [];
        this.isAI = true;
        this.position = position;
        this.currentPack = null;
        this.currentPackIndex = -1;
        this.currentPickIndex = 0;
        this.packQueue = []; // where packs go if player isn't done drafting a card from current pack
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
            // After passing, check to see if there is a pack waiting in your queue
            this.takePackFromQueue();

            // Pack still has cards, pass it
            this.$rootScope.$broadcast(`player:${this.position}:pass-pack`, {
                pack,
                position: this.position
            });
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
    }

    takePackFromQueue() {
        if (this.packQueue.length) {
            this.currentPack = this.packQueue.splice(0, 1)[0];
        }
    }

    startAI() {
        this.interval = this.$interval(() => {
            if (this.currentPack) {
                this.pickRandomCard();
            } else if (this.packQueue.length) {
                this.takePackFromQueue();
            }
        }, 100);
    }

    endAI() {
        this.interval.cancel();
    }
}
