export default class GlobalFooterController {
    constructor($window) {
        this.$window = $window;

        this.socialButtons = [
            {
                type: 'twitter'
            },
            {
                type: 'facebook'
            },
            {
                type: 'gplus'
            }
        ];
    }

    redirect(url) {
        this.$window.location.href = url;
    }
}
