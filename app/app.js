
keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener('deviceready', onDeviceReady, false);
} else {
    onDeviceReady();
}

function onDeviceReady() {
    alert('device ready');
    navigator.globalization.getPreferredLanguage(
    function (language) { alert('language: ' + language.value + '\n'); },
    function () { alert('Error getting language\n'); }
);
}





