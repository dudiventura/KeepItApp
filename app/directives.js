
var directives = {
    newQuestion: function () {
        return {
            templateUrl: 'app/views/main/new-question.html',
            controller:'newQuestion'
        }
    }
};

keepItApp.directive(directives);