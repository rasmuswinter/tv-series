"use strict";

angular.module('TvSeries')
    .controller('ShowController', function($scope, $stateParams, _, moment, DataService, localStorageService) {
        $scope.loading = true;
        $scope.seasons = [];
        $scope.currentSeason = null;
        $scope.showFound = true;
        $scope.tabs = [
            {
                title: 'Details',
                tab: 'details',
                icon: 'info'
            },
            {
                title: 'Summary',
                tab: 'summary',
                icon: 'list'
            },
            {
                title: 'Image',
                tab: 'image',
                icon: 'picture-o'
            },
            {
                title: 'Links',
                tab: 'links',
                icon: 'link'
            }
        ];
        $scope.currentTab = $scope.tabs[0];

        var seriesId = $stateParams.id;

        $scope.changeSeason = function(season) {
            $scope.currentSeason = season;
        };

        $scope.changeTab = function(tab) {
            $scope.currentTab = tab;
        };

        function getLinks(ids) {
            var links = [];
            if (ids.imdb) {
                links.push({
                    url: 'https://www.imdb.com/title/' + ids.imdb,
                    title: '',
                    icon: 'imdb'
                });
            }
            return links;
        }

        DataService.getShow(seriesId)
            .then(function(data) {
                $scope.show = data;
                $scope.show.showDetails = false;
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
                var rating = $scope.show.rating.average;
                $scope.show.rating.level = rating < 4 ? 'bad' : (rating > 7 ? 'good' : 'medium');
                $scope.show.links = getLinks($scope.show.externals);
            })
            .then(null, function(err) {
                $scope.loading = false;
                $scope.showFound = false;
            });
    });
