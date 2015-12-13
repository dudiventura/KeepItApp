var controllers = {
    appTitle: function ($scope) {
        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;
        });
    },
    chooseLanguage: function ($scope) {
        $scope.lang = (localStorage.getItem('lang') != undefined) ? localStorage.getItem('lang') : 'he';
        $scope.showLangPopup = false;
        //$scope.languages = [{ id:1, name: 'עברית', value: 'he' }, { id:2, name: 'English', value: 'en' }];
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
        $scope.init = function () {
            if ($scope.lang == 'en') {
                $scope.languageBtn = 'English';
            }
            else {
                $scope.languageBtn = 'עברית';
            }
        }
        $scope.changeLanguage = function (value) {
            $scope.lang = value;
            localStorage.setItem('lang', value);
            $scope.openHideLanguagePopup();
            $scope.init();
        }
        $scope.openHideLanguagePopup = function () {
            $scope.showLangPopup = !$scope.showLangPopup;
        }
        $scope.bgClass = 'intro-bg';
        $scope.pageClass = 'choose-language';
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
                registrationComplete: 'נרשמת בהצלחה',
                messageTitle: 'הודעה',
                inputVerification: 'יש למלא את כל הפרטים'

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
                messageTitle: 'Title',
                inputVerification: 'Please fill in all the fields'
            }
        };

        $scope.bgClass = 'intro-bg';
        $scope.pageClass = 'register';

        $scope.registerToApp = function () {
            if ($scope.validateInput($scope.email) && $scope.validateInput($scope.password) && $scope.validateInput($scope.name)) {
                $scope.register(); 
            } else {
                Message.showMessage($scope.langString[$scope.lang].inputVerification, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
            }
        }
        $scope.register = function () {
            var data = {
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
                            localStorage.setItem('userId', res.userId);
                            localStorage.setItem('email', $scope.email);
                            localStorage.setItem('name', $scope.name);
                            localStorage.setItem('password', $scope.password);
                            View.changeView('settings');
                        } break;

                    }
                })
                .error(function () { alert('error'); });
        }
        $scope.validateInput = function (value) {
            return (value == undefined || value == '') ? false : true;
        };
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
    wheel: function ($scope, Switcher, Message) {
        $scope.lang = localStorage.getItem('lang');
        $scope.langString = {
            he: {
                title: 'הנושא היום הוא:'

            },
            en: {
                title: 'The subjet today is:'
            }
        };

        $scope.pageClass = 'main';
        $scope.bgClass = 'intro-bg';
        //handler=questionHandler&handlerRequest=getCategories&requestVars={"categories":"all","lang":"he"}
        var data = { categories: 'all', lang: $scope.lang }
        console.log(data);
        Switcher.getSessions('questionHandler', 'getCategories', data)
            .success(function (res) {
                JSON.stringify(res);
            })
            .error(function (e) { alert('error'); });

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

