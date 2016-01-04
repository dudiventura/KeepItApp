var keepItApp;
var app = {
    init: function () {
        keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'angular-loading-bar']);

        if (app.isMobile()) {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        }
        else {
            app.onDeviceReady();
        }
    },
    onDeviceReady: function () {
        if (app.isMobile()) {
            app.getPhoneLanguage();
            app.getPhoneNumber();
        }
        app.startApp();
    },
    getPhoneLanguage: function () {
        var onSuccess = function (res) { localStorage.setItem('lang', res.value.split('-')[0]); }
        var onFaild = function () { }
        navigator.globalization.getPreferredLanguage(onSuccess, onFaild);
    },
    getPhoneNumber: function () {
        var onSuccess = function (res) { alert('your phone number is:\n' + res.phoneNumber); }
        var onFaild = function (error) { alert('Opps...:\n' + JSON.stringify(error)); }
        window.plugins.sim.getSimInfo(onSuccess, onFaild);
    },
    startApp: function () {
        var start = setInterval(function () {
            if (localStorage.getItem('lang') !== undefined) {
                clearInterval(start);
                angular.bootstrap(document, ['keepItApp']);
            }
        }, 500);
    },
    isMobile: function () {
        return (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) ? true : false;
    }
}

app.init();





