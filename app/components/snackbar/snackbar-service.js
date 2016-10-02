export default class SnackbarService {
    constructor($document) {
        this.snackbar = $document[0].querySelector('#snackbar');
    }

    showMessage(data) {
        this.snackbar.MaterialSnackbar.showSnackbar(data);
    }
}
