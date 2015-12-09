
keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener('deviceready', onDeviceReady, false);
} else {
    onDeviceReady();
}

function onDeviceReady() {
    alert('device ready');
    angular.bootstrap(document, ['keepItApp']);
    alert(device.platrorm);
    //navigator.globalization.getPreferredLanguage(
    //function (language) {
    //    localStorage.setItem('userLanguage', language.value.split('-')[0]);
    //},
    //function () { alert('Error getting language\n'); });
}





