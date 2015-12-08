
var keepItApp = null;

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener('deviceready', onDeviceReady, false);
} else {
    onDeviceReady();
}

function onDeviceReady() {
    alert('device ready');
    //angular.bootstrap(document, ['keepItApp']);
    createTheApp();
    alert(device.platform);
}


function createTheApp() {
    keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

    setFactories();
    setConrollers();
    setConfiguration();

}





