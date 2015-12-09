var controllers = {
    appTitle: function ($scope) {
        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;
        });
    },
    chooseLanguage: function ($scope, Switcher) {
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
        var s = { categories: 'all', lang: $scope.lang };
        Switcher.getSessions('questionHandler', 'getCategories', s).success(function (data, status) {alert(JSON.stringify(data));});
    },
    settings: function ($scope) {
        $scope.setAlarm = false;
        $scope.pageClass = 'settings';
        $scope.bgClass = 'intro-bg';
        $scope.moreAlarm = '+';
        $scope.addAlarm = function () {
            var alarm = prompt('הוספת תזכורת', '--:--');
            this.moreAlarm = alarm;
        }
    },
    user: function ($scope) {
        $scope.pageClass = 'main';
        $scope.bgClass = 'intro-bg';
    },
    question: function ($scope) {
        $scope.pageClass = 'question';
        $scope.bgClass = 'intro-bg';
        $scope.showPopup = false;
        $scope.bonus = false;
        $scope.general = false;
        $scope.blessing = '';
        $scope.answerText = ''
        $scope.points = ''
        $scope.wrong = false;

        $scope.showHidePopup = function (popup) {
            $scope.showPopup = !$scope.showPopup;
            switch (popup) {
                case undefined: { $scope.bonus = false; $scope.general = false; } break;
                case 'bonus': { $scope.bonus = true; } break;
                case 'general': { $scope.general = true; } break;
                default:

            }
        }

        $scope.checkAnswer = function (ansNum) {
            if (ansNum == 3) {
                $scope.blessing = 'מעולה!';
                $scope.answerText = 'הרווחת הרגע';
                $scope.points = '150 נקודות';
                $scope.wrong = false;
                $scope.showHidePopup('general');
            } else {
                $scope.blessing = 'התשובה הנכונה היא:';
                $scope.answerText = '';
                $scope.points = '3. קוראים לו, אם הוא לא מגיב, צובטים לו את עצם הסטרנום';
                $scope.wrong = true;
                $scope.showHidePopup('general');
            }
        }
    }

};

keepItApp.controller(controllers);

