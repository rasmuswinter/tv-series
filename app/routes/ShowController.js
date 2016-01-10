"use strict";

angular.module('TvSeries')
    .controller('ShowController', function($scope, $stateParams, _, moment, DataService, localStorageService) {
        $scope.loading = true;
        $scope.seasons = [];
        $scope.currentSeason = null;

        var seriesId = $stateParams.id;

        $scope.changeSeason = function(season) {
            $scope.currentSeason = season;
        };

        DataService.getShow(seriesId)
            .then(function(data) {
                $scope.show = data;
                var oldList = localStorageService.get('show-list');
                if (!oldList) {
                    oldList = [];
                }
                var existing = _.remove(oldList, { name: data.name });
                oldList.unshift({
                    name: data.name,
                    id: seriesId
                });
                oldList = oldList.slice(0, 20);
                localStorageService.set('show-list', oldList);
                return DataService.getEpisodes(seriesId);
            })
            .then(function(episodes) {
                $scope.loading = false;
                var seasons = _.groupBy(episodes, 'season');
                seasons = _.mapValues(seasons, function(episodes, key) {
                    return {
                        number: key,
                        episodes: episodes
                    };
                });
                seasons = _.values(seasons);
                $scope.seasons = seasons;
                $scope.changeSeason(seasons[0]);
            });
    });
