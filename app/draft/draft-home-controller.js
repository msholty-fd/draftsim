export default class DraftHomeController {
    constructor($http) {
        $http.get('/sets/active-sets.json').then((response) => {
            this.activeSets = response.data.sets;
        });
    }
}
