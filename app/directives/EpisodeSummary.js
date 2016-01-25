angular.module('TvSeries')
    .directive('episodeSummary', function() {
        return {
            scope: {
                episode: '='
            },
            replace: true,
            templateUrl: 'app/directives/episode-summary.html'
        };
    });