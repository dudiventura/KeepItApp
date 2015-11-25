var controllers = {
    chooseLanguage: function ($scope) {
        $scope.langString = {
            he: {
                label: 'בבקשה בחר שפה:',
                hebrew: 'עברית',
                english: 'English',
                btn:'הבא'
            },
            en: {
                label: 'Please select a language:',
                hebrew: 'Hebrew',
                english: 'English',
                btn:'Next'
            }
        }, 
        $scope.lang = 'he',
        $scope.title = 'hhh',
        $scope.pageClass = 'choose-language';
    },
    settings: function ($scope) {
        $scope.pageClass = 'settings';
        $scope.moreAlarm = '+';
        $scope.addAlarm = function () {
            var alarm = prompt('הוספת תזכורת', '--:--');
            this.moreAlarm = alarm;
        }
    },
    user: function ($scope) {
        $scope.pageClass = 'main';
    }
};

keepItApp.controller(controllers);