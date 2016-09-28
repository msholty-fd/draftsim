import _ from 'lodash';

export default class GlobalHeaderController {
    constructor(setsApi) {
        this.menuLinks = [
            {
                text: 'Sealed',
                sref: 'sealed'
            }, {
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
    }
}
