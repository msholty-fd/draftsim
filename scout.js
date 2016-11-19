(function() {
    //Configurable
    var base = 'https://d2jytc150hf7hn.cloudfront.net/';
    var scoutBucket = 'test';

    var styleguideVersion = getQueryVariable('styleguide');
    var scoutVersion = getQueryVariable('scout');

    if (scoutVersion === 'dev' || (!scoutVersion && location.hostname === "localhost")) {
        window.enableDebugInfo = true;
        base = 'https://localhost:9000';
    } else if (scoutVersion) {
        base += scoutVersion;
    } else {
        base += scoutBucket;
    }

    //Private
    var callbacks = [];
    var scriptsLoaded = false;
    var $R;

    window.$R = window.$F = $R = function(cb) {
        if (scriptsLoaded) {
            cb();
        } else {
            callbacks.push(cb);
        }
    };

    function onScriptsLoaded(cb) {
        for (var i = 0, ii = callbacks.length; i < ii; i++) {
            callbacks[i]();
        }
        scriptsLoaded = true;
    }

    function addScriptTag(f, cb) {
        var tag = document.createElement('script');
        tag.src = f;
        tag.async = true;
        addOnloadHandler(tag, cb);
        document.getElementsByTagName('head')[0].appendChild(tag)
    }

    function addCssTag(f, cb) {
        var tag = document.createElement('link');
        tag.rel = 'stylesheet';
        tag.href = f;
        addOnloadHandler(tag, cb);
        document.getElementsByTagName('head')[0].appendChild(tag)
    }

    function addPrefetchTag(f) {
        var tag = document.createElement('link');
        tag.rel = 'prefetch';
        tag.href = f;
        document.getElementsByTagName('head')[0].appendChild(tag)
    }

    function addOnloadHandler(tag, cb) {
        if (!cb) {
            return;
        }

        if (typeof tag.addEventListener !== 'undefined') {
            tag.addEventListener('load', cb, false);
        } else {
            tag.onreadystatechange = function() {
                tag.onreadystatechange = null;
                ieLoadBugFix(tag, cb);
            };
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }

    function addGlobalClass(className) {
        document.getElementsByTagName('html')[0].className += ' ' + className;
    }

    function cutsTheMustard() {
        return (
            'history' in window && window.history.pushState &&
            'withCredentials' in new window.XMLHttpRequest() &&
            typeof window.localStorage !== 'undefined' &&
            'querySelector' in document &&
            'addEventListener' in window &&
            'matchMedia' in window
        );
    }

    function loadResources() {
        if (cutsTheMustard()) {
            addCssTag(base + '/app.css');
            addScriptTag(base + '/app.js', onScriptsLoaded);

        } else {
            addGlobalClass('browser--unsupported');
        }
    }

    function preFetchResources() {
        if (cutsTheMustard()) {
            window.addEventListener('load', function() {
                addPrefetchTag(base + '/app.css');
                addPrefetchTag(base + '/app.js');
            });
        }
    }

    loadResources();
})();
