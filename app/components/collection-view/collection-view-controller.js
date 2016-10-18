export default class CollectionViewController {
    getImageSrc(cardName) {
        const cardSrcUrl = cardName.split(' ').join('_');

        return `http://draftsim.com/Images/${this.currentSet}/${cardSrcUrl}.jpg`;
    }
}
