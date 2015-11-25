
var keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

keepItApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'chooseLanguage',
        templateUrl: '/views/intro/choose-language.html'
    })
    .when('/register', {
        controller: 'chooseLanguage',
        templateUrl: '/views/intro/register.html'
    })
    .when('/settings', {
        controller: 'settings',
        templateUrl: '/views/intro/settings.html'
    })
    .when('/main', {
        controller: 'user',
        templateUrl: '/views/main/main.html'
    })
});


