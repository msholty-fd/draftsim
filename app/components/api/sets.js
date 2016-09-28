export default class setsApi {
    constructor($http) {
        this.$http = $http;
        this.sets = [];
    }

    getSet(setAbbr) {
        if (!this.sets[setAbbr]) {
            this.sets[setAbbr] = this.$http.get(`/sets/${setAbbr}.json`);
        }

        return this.sets[setAbbr];
    }

    getActiveSets() {
        if (!this.activeSetsPromise) {
            this.activeSetsPromise = this.$http.get('/sets/active-sets.json');
        }

        return this.activeSetsPromise;
    }
}
