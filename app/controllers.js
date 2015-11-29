var controllers = {
    chooseLanguage: function ($scope, Page) {
        $scope.langString = {
            he: {
                label: 'בבקשה בחר שפה:',
                hebrew: 'עברית',
                english: 'English',
                btn: 'הבא'
            },
            en: {
                label: 'Please select a language:',
                hebrew: 'Hebrew',
                english: 'English',
                btn: 'Next'
            }
        };
        $scope.lang = 'he';
        $scope.bgClass = 'intro-bg';
        $scope.title = 'hhh';
        $scope.pageClass = 'choose-language';

        Page.setTitle('choose language');
    },
    settings: function ($scope, Page) {
        $scope.setAlarm = false;
        $scope.pageClass = 'settings';
        $scope.bgClass = 'intro-bg';
        $scope.moreAlarm = '+';
        $scope.addAlarm = function () {
            var alarm = prompt('הוספת תזכורת', '--:--');
            this.moreAlarm = alarm;
        }
    },
    user: function ($scope, Page) {
        $scope.pageClass = 'main';
        $scope.bgClass = 'intro-bg'; 
    },
    question: function ($scope, Page) {
        $scope.pageClass = 'question';
        $scope.bgClass = 'intro-bg';
    }
  
};

keepItApp.controller(controllers);