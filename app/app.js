
keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener('deviceready', onDeviceReady, false);
} 

function onDeviceReady() {
    getPhoneLanguage();
    getPhoneNumber();
    startApp();
}

function getPhoneLanguage() {
    var onSuccess = function (res) { localStorage.setItem('lang', res.value.split('-')[0]); }
    var onFaild = function () { }

    navigator.globalization.getPreferredLanguage(onSuccess, onFaild);
}
 
function getPhoneNumber() {
    var onSuccess = function (res) { alert('your phone number is:\n' + res.phoneNumber); }
    var onFaild = function (error) { alert('Opps...:\n' + JSON.stringify(error)); }

    window.plugins.sim.getSimInfo(onSuccess, onFaild);

}

function startApp() {
    var start = setInterval(function () {
        alert(localStorage.getItem('lang'));
        if (localStorage.getItem('lang') !== undefined) {
            clearInterval(start);
            angular.bootstrap(document, ['keepItApp']);
        }
    }, 1000);
}





