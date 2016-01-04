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
    register: function ($scope, View, Switcher, Message, Snooze) {
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
                inputVerification: 'יש למלא את כל הפרטים',
                btnLogin: 'התחברות',
                incorrectName: 'שם לא נכון',
                incorrectPassword: 'סיסמה לא נכונה',
                accountInactive: 'משתמש חסום',
                incorrectEmail: 'כתובת מייל לא נכונה',
                loginComplete: 'התחברת בהצלחה'

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
                inputVerification: 'Please fill in all the fields',
                btnLogin: 'Login',
                incorrectName: 'Incorrect name',
                incorrectPassword: 'Incorrect password',
                accountInactive: 'Account inactive',
                incorrectEmail: 'Incorrect email',
                loginComplete: 'Login success'
            }
        };

        $scope.bgClass = 'intro-bg';
        $scope.pageClass = 'register';

        //validate input
        $scope.validateInput = function (value) {
            return (value == undefined || value == '') ? false : true;
        };

        //registration
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

        //login
        $scope.loginToApp = function () {
            if ($scope.validateInput($scope.email) && $scope.validateInput($scope.password) && $scope.validateInput($scope.name)) {
                $scope.login();
            } else {
                Message.showMessage($scope.langString[$scope.lang].inputVerification, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
            }
        }
        $scope.login = function () {
            var data = {
                email: $scope.email,
                pw: $scope.password,
                fName: $scope.name
            };
            Switcher.getSessions('userHandler', 'appLoginUser', data)
                .success(function (res) {
                    switch (res[0]) {
                        case 'incorrectEmail': { Message.showMessage($scope.langString[$scope.lang].incorrectEmail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'accountInactive': { Message.showMessage($scope.langString[$scope.lang].accountInactive, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'incorrectPassword': { Message.showMessage($scope.langString[$scope.lang].incorrectPassword, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'incorrectName': { Message.showMessage($scope.langString[$scope.lang].incorrectName, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        default: {
                            console.log(res);
                            Message.showMessage($scope.langString[$scope.lang].loginComplete, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                            localStorage.setItem('userId', res.userId);
                            localStorage.setItem('totalCredits', (res.totalCredits == null) ? 0 : parseInt(res.totalCredits));
                            localStorage.setItem('email', $scope.email);
                            localStorage.setItem('name', $scope.name);
                            localStorage.setItem('password', $scope.password);
                            View.changeView('settings');
                        } break;
                    }
                })
                .error(function () { alert('error'); });
        }

        Snooze.addSnooze();
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
        $scope.categoriesList = [];
        $scope.selectedCategory = '';
        $scope.selectedCategoryId = 0;
        $scope.selectedCategoryColor = '';
        $scope.selectedCategoryIcon = ''
        $scope.imageWidth = 35;
        $scope.imageHeight = 35;
        $scope.isSpinning = false;
        $scope.showDots = false;


        var data = { userId: localStorage.getItem('userId'), lang: $scope.lang }
        console.log(data);
        Switcher.getSessions('categoryHandler', 'getUserCategories', data)
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
                img.src = data[i].icon;
                img.color = data[i].color;
                img.width = $scope.imageWidth;
                img.height = $scope.imageHeight;
                if (localStorage.getItem('lang') == 'he') {
                    img.alt = data[i].title_he;
                } else {
                    img.alt = data[i].title_en;
                }

                images.push(img);
            }

            var theme = {
                Colour1: '#ff0',
                Colour2: '#000',
                WheelColour: 'transparent',
                FontColour1: "#000",
                FontColour2: "#ff0",
                Slice1Colour: "#006",
                Font: "FbOxford-Regular",
                PegColour1: "#fff",
                PegColour2: "#000",
                PointerColour1: "#fff",
                PointerColour2: "#000",
                CentreColour: '#f4eae0',
                HighlightColour: 'transparent',
                SliceText: ""
            }

            myWheel = SPINWHEEL.wheelOfDestiny('wheel', images, theme, 3);
        }

        $scope.spin = function () {
            myWheel.Start();
            $scope.isSpinning = true;
            $scope.showDots = true;
            myWheel.SetOnCompleted(function (category) {
                $scope.$apply(function () {
                    console.log(category.alt);
                    $scope.showDots = false;
                    $scope.selectedCategory = category.alt;
                    $scope.selectedCategoryId = category.id;
                    $scope.selectedCategoryColor = category.color;
                    $scope.selectedCategoryIcon = category.src;
                    console.log($scope.selectedCategory + ' ' + $scope.selectedCategoryId + ' ' + $scope.selectedCategoryColor);
                });
            });
        }

        $scope.logout = function () {
            localStorage.clear();
        }

    },
    question: function ($scope, $routeParams, $interval, Switcher, View, Message) {
        console.log('$', $routeParams);
        $scope.lang = localStorage.getItem('lang');
        $scope.pageClass = 'question';
        $scope.bgClass = 'intro-bg';
        $scope.catId = $routeParams.catId;
        $scope.catIcon = $routeParams.catIcon;
        $scope.catColor = $routeParams.catColor;
        $scope.showPopup = (localStorage.getItem('showIntro') == undefined) ? true : false;
        $scope.bonus = (localStorage.getItem('showIntro') == undefined) ? true : false;
        $scope.isNew;
        $scope.bonusCounting;
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
        $scope.userAnswers = new Array();
        $scope.usersAnswersIds = new Array();
        $scope.timerToBonus = 0;

        var data = { userId: localStorage.getItem('userId'), categoryId: $scope.catId, qType: 'answered', lang: $scope.lang };

        console.log(data);
        Switcher.getSessions('questionHandler', 'getUserQuestionByCategory', data)
            .success(function (res) {
                if (res != 'null') {
                    $scope.thisQuestion = res;
                    $scope.thisQuestion.bonus = $scope.thisQuestion.credits / 2;
                    console.log('$scope.thisQuestion', $scope.thisQuestion);
                    switch (res.qTypeId) {
                        case '1': { $scope.oneAnswer = true; } break; //one answer
                        case '2': { $scope.multipleAnswers = true; } break; //multiple answers
                        case '3': { $scope.yesOrNo = true; } break; //yes or no
                        case '4': { $scope.order = true; } break; //order
                        default: { } break;
                    }
                    $scope.answersIds = res.questionOptionIds.split(',');
                    $scope.answerDesc = res.questionOptions.split(',');
                    $scope.isNew = (res.qType == 'answered') ? false : true;
                    $scope.startBonusCalculation($scope.thisQuestion);

                    $scope.googleSearch();
                }
                else {
                    Message.showMessage('אופס... אין שאלות בקטגוריה זו.', 'KeepItApp', 'אישור');
                    View.changeView('wheel');

                }

            })
            .error(function (e) { $scope.categoriesList = []; });

        $scope.googleSearch = function () {
            var cx = '002673862978533558277:eqqp2uqxpmm';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                '//cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
            var placeholder = setTimeout(function () {
                $('.gsib_a > input').attr('placeholder', 'Google');
                clearTimeout(placeholder);
            }, 500);

        }

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
                $scope.bonusCounting = $interval(function () {
                    if ($scope.thisQuestion.bonus > 0 && count == 6) {
                        var b = $scope.thisQuestion.bonus * 0.9;
                        if (b.toFixed(1) == $scope.thisQuestion.bonus) {
                            b = 0;
                        }
                        $scope.thisQuestion.bonus = b.toFixed(1);
                        count = 0;
                    } else {
                        if (count < 6) {
                            count++;
                        } else {
                            count = 0;
                        }

                        if ($scope.thisQuestion.bonus <= 0) {
                            $scope.thisQuestion.bonus = 0;
                            $interval.cancel($scope.bonusCounting);
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

        $scope.checkMultiAnswer = function (ans, id) {
            if ($scope.count < $scope.thisQuestion.numCorrectAnswers * 1) {
                if ($.inArray(id + '-' + ans, $scope.userAnswers) != -1) { //in the array
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                    $scope.userAnswers = $.grep($scope.userAnswers, function (value) { return value != id + '-' + ans });
                    $scope.usersAnswersIds = $.grep($scope.usersAnswersIds, function (value) { return value != id.split('_')[1] });
                    $scope.count--;
                }
                else { //not in the array
                    $scope.count++;
                    $scope.userAnswers.push(id + '-' + ans);
                    $scope.usersAnswersIds.push(id.split('_')[1]);
                    $('[data-id="' + id + '"]').prev('input').prop('checked', true);
                }
            } else {
                if ($.inArray(id + '-' + ans, $scope.userAnswers) != -1) {
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                    $scope.userAnswers = $.grep($scope.userAnswers, function (value) { return value != id + '-' + ans });
                    $scope.usersAnswersIds = $.grep($scope.usersAnswersIds, function (value) { return value != id.split('_')[1] });
                    $scope.count--;
                }
                else {
                    alert('לא ניתן לבחור יותר');
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                }
            }
        }

        $scope.checkOneAnswer = function (id) {
            var n = $('[data-id="' + id + '"]').prev('input').attr('name');
            $('radio[name="' + n + '"]').prop('checked', false);
            $('[data-id="' + id + '"]').prev('input').prop('checked', true);
            var ans = $('[data-id="' + id + '"]').prev('input').attr('data-answer');
            $scope.userAnswers = new Array();
            $scope.userAnswers.push(ans);
            $scope.usersAnswersIds = new Array();
            $scope.usersAnswersIds.push(id.split('_')[1]);
        }

        $scope.checkAnswer = function () {
            //stop the bonus
            $interval.cancel($scope.bonusCounting);

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

                    (c == $scope.count) ? $scope.showCorrectPopup() : $scope.showIncorrectPopup();

                } else {
                    alert('לא בחרת את כל התשובות האפשריות');
                }
            }
            if ($scope.oneAnswer) {
                if ($scope.thisQuestion.answerDesc.indexOf($scope.userAnswers[0]) != -1) {
                    $scope.showCorrectPopup();
                } else {
                    $scope.showIncorrectPopup();
                }
            }
        }

        $scope.showCorrectPopup = function () {
            var credits = $scope.calcCredits($scope.thisQuestion.credits, $scope.thisQuestion.bonus);
            $scope.blessing = 'מעולה!';
            $scope.answerText = 'הרווחת הרגע';
            $scope.points = 'נקודות ' + credits
            $scope.wrong = false;
            $scope.showHidePopup('general');
            for (var i = 0; i < $scope.userAnswers.length; i++) {
                $scope.userAnswers[i] = $scope.userAnswers[i].split('-')[1];
            }
            $scope.sendAnswer($scope.thisQuestion.questionId, $scope.userAnswers.join(), $scope.usersAnswersIds.join(), 1, $scope.thisQuestion.difficulty, credits);
        }

        $scope.showIncorrectPopup = function () {
            $scope.blessing = 'התשובות הנכונות הן: ';
            $scope.answerText = '';
            $scope.points = $scope.thisQuestion.answerDesc;
            $scope.wrong = true;
            $scope.showHidePopup('general');
            $scope.thisQuestion.bonus = 0;
            for (var i = 0; i < $scope.userAnswers.length; i++) {
                $scope.userAnswers[i] = $scope.userAnswers[i].split('-')[1];
            }
            $scope.sendAnswer($scope.thisQuestion.questionId, $scope.userAnswers.join(), $scope.usersAnswersIds.join(), 0, $scope.thisQuestion.difficulty, 0);
        }

        $scope.calcCredits = function (n1, n2) {
            return (n1 * 1) + (n2 * 1);
        }

        $scope.sendAnswer = function (qId, answerDesc, optionId, correct, difficulty, credits) {
            var data = {
                userId: localStorage.getItem('userId'),
                questionId: qId,
                answerDesc: answerDesc,
                optionId: optionId,
                correct: correct,
                difficulty: difficulty,
                credits: credits,
                lang: $scope.lang
            }
            console.log(data);
            Switcher.getSessions('answerHandler', 'setUserAnswer', data)
            .success(function (res) {
                $scope.$apply();
            })
            .error(function (e) { });
        }
    },

    newQuestion: function ($scope, $routeParams, $interval, Switcher, View, Message) {

    },

    oldQuestion: function ($scope, $routeParams, $interval, Switcher, View, Message) { }
};

keepItApp.controller(controllers);

