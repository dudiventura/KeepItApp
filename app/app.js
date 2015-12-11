
keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener('deviceready', onDeviceReady, false);
} 

function onDeviceReady() {
    angular.bootstrap(document, ['keepItApp']);
    window.plugins.sim.getSimInfo(function (s) {
        alert('your phone number is:\n' + s.phoneNumber);
    }, function (e) {
        alert('e:\n' + JSON.stringify(e));
    });
}





