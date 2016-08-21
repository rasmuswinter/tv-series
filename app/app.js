"use strict";

angular
    .module('TvSeries', [
        'ngRoute',
        'ui.router',
        'ngclipboard',
        'LocalStorageModule'
    ])
    .config(function($routeProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                url: '/',
                templateUrl: 'app/routes/home.html',
                controller: 'HomeController'
            })
            .state('show', {
                url: '/show/:id',
                templateUrl: 'app/routes/show.html',
                controller: 'ShowController'
            })
            .state('episode', {
                url: '/show/:showId/episode/:episodeId',
                templateUrl: 'app/routes/episode.html',
                controller: 'EpisodeController'
            });
        $urlRouterProvider.otherwise("/");
    })
    .factory('_', function($window) {
        return $window._;
    })
    .factory('moment', function($window) {
        return $window.moment;
    })
    .config(function($sceProvider) {
        $sceProvider.enabled(false);
    })
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('TvSeries');
    })
    .filter('fixedLength', function () {
        return function (n, len) {
            var num = String(n);
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    })
    .filter('airdate', function(moment) {
        return function(date) {
            return moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');
        }
    })
;