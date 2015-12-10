var controllers = {
    appTitle: function ($scope) {
        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;
        });
    },
    chooseLanguage: function ($scope) {
        $scope.lang = (localStorage.getItem('lang') != undefined) ? localStorage.getItem('lang') : 'he';
        $scope.languages = [{ id:1, name: 'עברית', value: 'he' }, { id:2, name: 'English', value: 'en' }];
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
        $scope.changeLanguage = function () {
            $scope.lang = $scope.item.value;
            localStorage.setItem('lang', $scope.item.value);
        }
        $scope.bgClass = 'intro-bg';
        $scope.pageClass = 'choose-language';
        //var s = { categories: 'all', lang: $scope.lang };
        //Switcher.getSessions('questionHandler', 'getCategories', s).success(function (data, status) {alert(JSON.stringify(data));});
    },
    register: function ($scope, View, Switcher, Message) {
        $scope.lang = localStorage.getItem('lang');
        $scope.langString = {
            he: {
                email: 'אימייל',
                password: 'סיסמה',
                name: 'שם פרטי',
                btn: 'הבא',
                registrationFail: 'הרשמה נכשלה',
                emailExists: 'כתובת מייל קיימת',
                userExists: 'משתמש קיים',
                activationFail: 'תהליך ההרשמה נכשל',
                registrationComplete:'נרשמת בהצלחה',
                messageTitle:'הודעה'

            },
            en: {
                email: 'Email',
                password: 'Password',
                name: 'First Name',
                btn: 'Next',
                registrationFail: 'registration fail',
                emailExists: 'email exists',
                userExists: 'user exists',
                activationFail: 'activation fail',
                registrationComplete: 'registration complete',
                messageTitle:'Title'
            }
        };

        $scope.bgClass = 'intro-bg';
        $scope.pageClass = 'register';

        $scope.registerToApp = function () {
            data = {
                email: $scope.email,
                pw: $scope.password,
                fName: $scope.name
            };
            Switcher.getSessions('userHandler', 'registerUser', data)
                .success(function (res) {
                    switch (res) {
                        case 'registrationFail': { Message.showMessage($scope.langString[$scope.lang].registrationFail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'emailExists': { Message.showMessage($scope.langString[$scope.lang].emailExists, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'userExists ': { Message.showMessage($scope.langString[$scope.lang].userExists, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'activationFail': { Message.showMessage($scope.langString[$scope.lang].activationFail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        default: {
                            Message.showMessage($scope.langString[$scope.lang].registrationComplete, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                            View.changeView('settings');
                        } break;

                    }
                })
                .error(function () { alert('error'); });
        }
        
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
        $scope.lang = localStorage.getItem('lang');
        $scope.langString = {
            he: {
                title:'הנושא היום הוא:'

            },
            en: {
                title:'The subjet today is:'
            }
        };

        $scope.pageClass = 'main';
        $scope.bgClass = 'intro-bg';

    },
    question: function ($scope, Switcher) {
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

