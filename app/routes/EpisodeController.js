"use strict";

angular.module('TvSeries')
    .controller('EpisodeController', function($scope, $stateParams, _, moment, DataService) {
        $scope.loading = true;
        $scope.episodeDetails = null;

        var seriesId = $stateParams.showId;
        var episodeId = $stateParams.episodeId;
        var parts = episodeId.split('x');

        DataService.getEpisode(seriesId, parts[0], parts[1])
            .then(function(data) {
                $scope.episodeDetails = data;
            });
    });
