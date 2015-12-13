
var app = {
    init: function () {
        keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        }
    },
    onDeviceReady: function () {
        this.getPhoneLanguage();
        this.getPhoneNumber();
        this.startApp();
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
        }, 1000);
    }
}

app.init();





