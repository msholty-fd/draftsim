export default class MagicCardController {
    getImageSrc() {
        const cardSrcUrl = this.card.name.split(' ').join('_');

        return `http://draftsim.com/Images/${this.card.setAbbr}/${cardSrcUrl}.jpg`;
    }
}
