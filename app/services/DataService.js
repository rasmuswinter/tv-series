"use strict";

angular.module('TvSeries')
    .factory('DataService', function($http) {
        var service = {
            root: 'http://api.tvmaze.com/',
            getData: function(data) {
                return data.data;
            }
        };

        service.search = function(text) {
            return $http
                .get(service.root + 'search/shows?q=' + text)
                .then(service.getData);
        };

        service.getShow = function(id) {
            return $http
                .get(service.root + 'shows/' + id)
                .then(service.getData);
        };

        service.getEpisodes = function(id) {
            return $http
                .get(service.root + 'shows/' + id + '/episodes')
                .then(service.getData);
        };

        service.getEpisode = function(showId, seasonNumber, episodeNumber) {
            return $http
                .get(service.root + 'shows/' + showId + '/episodebynumber?season=' + seasonNumber + '&number=' + episodeNumber)
                .then(service.getData);
        };

        return service;
    });