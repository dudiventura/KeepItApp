
var directives = {
    newQuestion: function () {
        return {
            templateUrl: 'app/views/main/new-question.html',
            controller:'newQuestion'
        }
    },
    oldQuestion: function () {
        return {
            templateUrl: 'app/views/main/old-question.html',
            controller: 'oldQuestion'
        }
    }
};

keepItApp.directive(directives);