angular.module('TvSeries')
    .directive('episodeSummary', function() {
        return {
            scope: {
                episode: '=',
                show: '='
            },
            replace: true,
            templateUrl: 'app/directives/episode-summary.html'
        };
    });