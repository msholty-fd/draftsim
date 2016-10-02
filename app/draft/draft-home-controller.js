export default class DraftHomeController {
    constructor(setsApi) {
        setsApi.getActiveSets().then((response) => {
            this.activeSets = response.data.sets;
        });
    }
}
