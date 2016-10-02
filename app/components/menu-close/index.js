import angular from 'angular';

export default angular.module('ds.components.menu-close', [])

.directive('menuClose', function() {
    return {
        restrict: 'AC',
        link(scope, element) {
            element.bind('click', function() {
                const drawer = angular.element(document.querySelector('.mdl-layout__drawer'));

                if (drawer) {
                    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
                    drawer.toggleClass('is-visible');
                }
            });
        }
    };
});
