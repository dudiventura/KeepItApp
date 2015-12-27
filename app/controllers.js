var controllers = {
    appTitle: function ($scope) {
        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;
        });
    },
    chooseLanguage: function ($scope, View) {
        $scope.lang = (localStorage.getItem('lang') != undefined) ? localStorage.getItem('lang') : 'he';
        localStorage.setItem('lang', $scope.lang);
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

        if (localStorage.getItem('userId') != undefined) {
            View.changeView('wheel');
        }
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
                    switch (res[0]) {
                        case 'registrationFail': { Message.showMessage($scope.langString[$scope.lang].registrationFail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'emailExists': { Message.showMessage($scope.langString[$scope.lang].emailExists, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'userExists': { Message.showMessage($scope.langString[$scope.lang].userExists, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'activationFail': { Message.showMessage($scope.langString[$scope.lang].activationFail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        default: {
                            console.log(res[0]);
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
    wheel: function ($scope, $interval, Switcher, Message) {
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
        $scope.categoriesList = [];
        $scope.selectedCategory = '';
        $scope.selectedCategoryId = 0;
        var data = { userId: localStorage.getItem('userId'), lang: $scope.lang }
        console.log(data);
        Switcher.getSessions('questionHandler', 'getUserCategories', data)
            .success(function (res) {
                console.log('getUserCategories', res);
                $scope.categoriesList = res;
                $scope.createWheel(res);
            })
            .error(function (e) { console.log('error', e); $scope.categoriesList = []; });

        $scope.createWheel = function (data) {
            var images = new Array();
            for (var i = 0; i < data.length; i++) {
                var img = new Image();
                img.id = data[i].id;
                if (localStorage.getItem('lang') == 'he') {
                    img.alt = data[i].title_he;
                } else {
                    img.alt = data[i].title_en;
                }
                img.src = data[i].icon;
                images.push(img);
            }
            myWheel = SPINWHEEL.wheelOfDestiny('wheel', images);
            myWheel.SetTheme({
                Colour1: '#ff0',
                Colour2: '#000',
                WheelColour: "#fff",
                FontColour1: "#000",
                FontColour2: "#ff0",
                Slice1Colour: "#006",
                Font: "Arial",
                PegColour1: "#fff",
               PegColour2: "#000",
                PointerColour1: "#fff",
                PointerColour2: "#000",
                CentreColour: "#903",
                HighlightColour: 'transparent',
                SliceText: ""
            });
        }

        $scope.spin = function () {
            myWheel.Start();
            myWheel.SetOnCompleted(function (category) {
                console.log(category.alt);
                $scope.selectedCategory = category.alt;
                $scope.selectedCategoryId = category.id;
            });
        }

        

    },
    question: function ($scope, $routeParams, $interval, Switcher, View, Message) {
        console.log($routeParams);
        $scope.lang = localStorage.getItem('lang');
        $scope.pageClass = 'question';
        $scope.bgClass = 'intro-bg';
        $scope.showPopup = (localStorage.getItem('showIntro') == undefined) ? true : false;
        $scope.bonus = (localStorage.getItem('showIntro') == undefined) ? true : false;;
        $scope.general = false;
        $scope.blessing = '';
        $scope.answerText = '';
        $scope.points = '';
        $scope.wrong = false;
        $scope.multipleAnswers = false;
        $scope.oneAnswer = false;
        $scope.yesOrNo = false;
        $scope.order = false;
        $scope.thisQuestion = {};
        $scope.answersIds = [];
        $scope.answerDesc = [];
        $scope.count = 0;
        $scope.userAnswers = [];
        $scope.timerToBonus = 0;

        var data = { userId: localStorage.getItem('userId'), categoryId: $routeParams.cat, qType: 'new', lang: $scope.lang };
        //var data = { userId: 2, categoryId: 5, qType: 'new', lang: $scope.lang }
        console.log(data);
        Switcher.getSessions('questionHandler', 'getUserQuestionByCategory', data)
            .success(function (res) {
                if (res != 'null') {
                    $scope.thisQuestion = res;
                    $scope.thisQuestion.bonus = $scope.thisQuestion.credits / 2;
                    console.log('$scope.thisQuestion', $scope.thisQuestion);
                    switch (parseInt(res.qTypeId)) {
                        case 1: { $scope.oneAnswer = true; } break; //one answer
                        case 2: { $scope.multipleAnswers = true; } break; //multiple answers
                        case 3: { $scope.yesOrNo = true; } break; //yes or no
                        case 4: { $scope.order = true; } break; //order
                        default: { } break;
                    }
                    $scope.answersIds = res.questionOptionIds.split(',');
                    $scope.answerDesc = res.questionOptions.split(',');

                    $scope.startBonusCalculation($scope.thisQuestion);
                }
                else {
                    var cb = function() { View.changeView('wheel'); }
                    Message.showMessage('אופס... אין שאלות בקטגוריה זו.', 'KeepItApp', 'אישור', cb);
                    
                }

            })
            .error(function (e) { $scope.categoriesList = []; });

        $scope.startBonusCalculation = function (res) {
            if (res.answerDesc.split(',').length + res.questionDesc.split(' ').length <= 10) {
                $scope.timerToBonus = 5;
            } else if (res.answerDesc.split(',').length + res.questionDesc.split(' ').length >= 80) {
                $scope.timerToBonus = 15;
            } else {
                $scope.timerToBonus = (res.answerDesc.split(',').length + res.questionDesc.split(' ').length + 25) / 7;
            }


            var timer = function () {
                if ($scope.timerToBonus > 0) {
                    $scope.timerToBonus--;
                    setTimeout(timer, 1000);
                } else {
                    clearTimeout();
                    startBonus();
                }
            }

            var startBonus = function () {
                console.log('startBonus');
                var count = 0;
                var bonusCounting = $interval(function () {
                    if ($scope.thisQuestion.bonus > 0 && count == 6) {
                        $scope.thisQuestion.bonus = Math.floor($scope.thisQuestion.bonus * 0.9);
                        count = 0;
                    } else {
                        if (count < 6) {
                            count++;
                        } else {
                            count = 0;
                        }

                        if ($scope.thisQuestion.bonus <= 0) {
                            $scope.thisQuestion.bonus = 0;
                            $interval.cancel(bonusCounting);
                        }
                    }
                }, 1000);
            }

            timer();

        }

        $scope.showHidePopup = function (popup) {
            localStorage.setItem('showIntro', 'true');
            $scope.showPopup = !$scope.showPopup;
            switch (popup) {
                case undefined: { $scope.bonus = false; $scope.general = false; } break;
                case 'bonus': { $scope.bonus = true; } break;
                case 'general': { $scope.general = true; } break;
                default:

            }
        }

        $scope.checkAnswer = function () {
            if ($scope.multipleAnswers) {
                if ($scope.thisQuestion.numCorrectAnswers * 1 == $scope.count) {//check if all the answers are checked
                    //get the users answers
                    var userAnswers = [];
                    for (answer in $scope.userAnswers) {
                        userAnswers.push($scope.userAnswers[answer].split('-')[1]);
                    }
                    //check currect
                    var c = 0;
                    for (var i = 0; i < $scope.count; i++) {
                        ($scope.thisQuestion.answerDesc.indexOf(userAnswers[i]) != -1) ? c++ : null;
                    }

                    if (c == $scope.count) { // all the answers are current
                        $scope.blessing = 'מעולה!';
                        $scope.answerText = 'הרווחת הרגע';
                        $scope.points = '150 נקודות';
                        $scope.wrong = false;
                        $scope.showHidePopup('general');
                    } else {
                        $scope.blessing = 'התשובות הנכונות הן: ';
                        $scope.answerText = '';
                        $scope.points = $scope.thisQuestion.answerDesc;
                        $scope.wrong = true;
                        $scope.showHidePopup('general');
                    }

                } else {
                    alert('לא בחרת את כל התשובות האפשריות');
                }



            }
            //if (ansNum == $scope.answersIds[($scope.thisQuestion.answerId*1) -1]) {
            //    $scope.blessing = 'מעולה!';
            //    $scope.answerText = 'הרווחת הרגע';
            //    $scope.points = '150 נקודות';
            //    $scope.wrong = false;
            //    $scope.showHidePopup('general');
            //} else {
            //    $scope.blessing = 'התשובה הנכונה היא:';
            //    $scope.answerText = '';
            //    $scope.points = ($scope.thisQuestion.answerId * 1) + '. ' + $scope.thisQuestion.answerDesc;
            //    $scope.wrong = true;
            //    $scope.showHidePopup('general');
            //}
        }

        $scope.checkMultiAnswer = function (ans, id) {
            if ($scope.count < $scope.thisQuestion.numCorrectAnswers * 1) {
                if ($.inArray(id + '-' + ans, $scope.userAnswers) != -1) { //in the array
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                    $scope.userAnswers = $.grep($scope.userAnswers, function (value) { return value != id + '-' + ans });
                    $scope.count--;
                }
                else { //not in the array
                    $scope.count++;
                    $scope.userAnswers.push(id + '-' + ans);
                    $('[data-id="' + id + '"]').prev('input').prop('checked', true);
                }
            } else {
                if ($.inArray(id + '-' + ans, $scope.userAnswers) != -1) {
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                    $scope.userAnswers = $.grep($scope.userAnswers, function (value) { return value != id + '-' + ans });
                    $scope.count--;
                }
                else {
                    alert('לא ניתן לבחור יותר');
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                }
            }
        }
    }
};

keepItApp.controller(controllers);

