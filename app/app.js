
var keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

keepItApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'chooseLanguage',
        templateUrl: 'app/views/intro/choose-language.html'
    })
    .when('/register', {
        controller: 'chooseLanguage',
        templateUrl: 'app/views/intro/register.html'
    })
    .when('/settings', {
        controller: 'settings',
        templateUrl: 'app/views/intro/settings.html'
    })
    .when('/main', {
        controller: 'user',
        templateUrl: 'app/views/main/main.html'
    }).
    when('/question', {
        controller: 'question',
        templateUrl: 'app/views/main/question.html'
    })
});


