
keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener('deviceready', onDeviceReady, false);
} else {
    onDeviceReady();
}

function onDeviceReady() {
    alert('device ready');
    //alert(device.platform);
}





