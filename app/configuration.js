
keepItApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'chooseLanguage',
        templateUrl: 'app/views/intro/choose-language.html',
        title: 'Choose Language'
    })
    .when('/register', {
        controller: 'register',
        templateUrl: 'app/views/intro/register.html',
        title: 'Register'
    })
    .when('/settings', {
        controller: 'settings',
        templateUrl: 'app/views/intro/settings.html',
        title: 'Settings'
    })
    .when('/wheel', {
        controller: 'wheel',
        templateUrl: 'app/views/main/wheel.html',
        title: 'Wheel'
    }).
    when('/question', {
        controller: 'question',
        templateUrl: 'app/views/main/question.html',
        title: 'Question'
    })
});