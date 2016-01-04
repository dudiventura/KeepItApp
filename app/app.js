var keepItApp;
var app = {
    init: function () {
        keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'angular-loading-bar']);

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        }
    },
    onDeviceReady: function () {
        alert('onDeviceReady');
        this.getPhoneLanguage();
        this.getPhoneNumber();
        this.startApp();
    },
    getPhoneLanguage: function () {
        alert('getPhoneLanguage');
        var onSuccess = function (res) { localStorage.setItem('lang', res.value.split('-')[0]); }
        var onFaild = function () { }
        navigator.globalization.getPreferredLanguage(onSuccess, onFaild);
    },
    getPhoneNumber: function () {
        alert('getPhoneNumber');
        var onSuccess = function (res) { alert('your phone number is:\n' + res.phoneNumber); }
        var onFaild = function (error) { alert('Opps...:\n' + JSON.stringify(error)); }
        window.plugins.sim.getSimInfo(onSuccess, onFaild);
    },
    startApp: function () {
        alert('startApp');
        var start = setInterval(function () {
            alert('start');
            if (localStorage.getItem('lang') !== undefined) {
                clearInterval(start);
                angular.bootstrap(document, ['keepItApp']);
            }
        }, 500);
    }
}

app.init();





