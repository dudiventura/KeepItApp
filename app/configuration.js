
keepItApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'chooseLanguage',
        templateUrl: 'app/views/intro/choose-language.html',
        title: 'Choose Language'
    })
    .when('/register', {
        controller: 'chooseLanguage',
        templateUrl: 'app/views/intro/register.html',
        title: 'Register'
    })
    .when('/settings', {
        controller: 'settings',
        templateUrl: 'app/views/intro/settings.html',
        title: 'Settings'
    })
    .when('/main', {
        controller: 'user',
        templateUrl: 'app/views/main/main.html',
        title: 'Main'
    }).
    when('/question', {
        controller: 'question',
        templateUrl: 'app/views/main/question.html',
        title: 'Question'
    })
});