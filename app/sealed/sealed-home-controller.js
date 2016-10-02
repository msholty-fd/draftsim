export default class SealedHomeController {
    constructor(setsApi) {
        setsApi.getActiveSets().then((response) => {
            this.activeSets = response.data.sets;
        });
    }
}
