"use strict";

angular.module('TvSeries')
    .controller('HomeController', function($scope, _, DataService, localStorageService) {
        $scope.loading = false;
        $scope.searchText = '';
        $scope.shows = [];

        $scope.oldShows = localStorageService.get('show-list');

        $scope.searchByName = _.debounce(function(text) {
            $scope.searchText = text;
            $scope.shows = [];
            if (text) {
                $scope.loading = true;
                DataService.search(text)
                    .then(function (shows) {
                        $scope.loading = false;
                        $scope.shows = shows;
                    });
            }
        }, 500);
    });
