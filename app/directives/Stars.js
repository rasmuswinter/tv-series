angular.module('TvSeries')
    .directive('stars', function() {
        return {
            scope: {
                rating: '='
            },
            replace: true,
            templateUrl: 'app/directives/stars.html',
            link: function(scope) {
                function range(num) {
                    var a = [];
                    for (var i=0; i<num; i++) {
                        a.push(i);
                    }
                    return a;
                }

                scope.$watch('rating', function(rating) {
                    var full = Math.floor(rating);
                    var half = rating-full >= 0.5 ? 1 : 0;
                    scope.stars = {
                        full: range(full),
                        half: range(half),
                        empty: range(10-full-half)
                    };
                });
            }
        };
    });