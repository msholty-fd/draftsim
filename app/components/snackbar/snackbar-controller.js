export default class SnackbarController {
    constructor(SnackbarService) {
        this.SnackbarService = SnackbarService;
    }

    buttonClicked() {
        this.SnackbarService.buttonClicked();
    }

    get messageText() {
        return this.SnackbarService.messageText;
    }

    get buttonText() {
        return this.SnackbarService.buttonText;
    }

    get isSnackbarVisible() {
        return this.SnackbarService.isSnackbarVisible;
    }
}
