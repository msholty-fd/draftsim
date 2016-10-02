import _ from 'lodash';

export default class GlobalHeaderController {
    constructor(setsApi, $state) {
        this.menuLinks = [
            {
                text: 'Methodology',
                sref: 'methodology'
            }, {
                text: 'About',
                sref: 'about'
            }
        ];

        this.activeSets = [];

        setsApi.getActiveSets().then((response) => {
            _.each(response.data.sets, (set) => {
                this.activeSets.push(set);
            });
        });

        this.isDraftMenuOpen = false;
        this.$state = $state;
    }
}
