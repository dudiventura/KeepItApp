
var keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

keepItApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'test',
        templateUrl:'/views/a.html'
    })
});