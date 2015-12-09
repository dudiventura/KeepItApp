
var factories = {
    Switcher: function ($http) {
        var url = 'http://dev.mly.co.il/trivia/switcher.php';

        this.getSessions = function (uHandler, uRequest, uData) {
            return $http.get(url, { params: { handler: uHandler, handlerRequest: uRequest, requestVars: uData }, headers: { 'Authorization': function () { return null; } } });
        };

        return this;
    },
    View: function ($location) {
        this.changeView = function (view) {
            $location.path(view);
        }
        return this;
    },
    Message: function () {
        this.showMessage = function (message, title, btn) {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                navigator.notification.alert(message, null, title, btn);
            } else {
                alert(message);
            }  
        }
        return this;
    }
};

keepItApp.factory(factories);

