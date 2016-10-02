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
}
