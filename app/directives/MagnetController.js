angular.module('TvSeries')
    .directive('magnet', function() {
        return {
            scope: {
            },
            replace: true,
            templateUrl: 'app/directives/magnet.html',
            link: function(scope) {
                scope.magnet = {
                    hash: '',
                    description: '',
                    valid: function() {
                        var hash = this.hash.toUpperCase();
                        return !!hash && hash.match(/^[0-9A-F]+$/);
                    },
                    link: function() {
                        var link = 'magnet:?xt=urn:btih:' + this.hash;
                        if (this.description) {
                            link += '&dn=' + encodeURIComponent(this.description);
                        }
                        return link;
                    }
                };
            }
        };
    });