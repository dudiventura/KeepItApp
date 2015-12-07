
var factories = {
    Switcher: function ($http) {
        var url = 'http://dev.mly.co.il/trivia/switcher.php';

        this.getSessions = function (uHandler, uRequest, uData) {
            return $http.get(url, { params: { handler: uHandler, handlerRequest: uRequest, requestVars: uData }, headers: { 'Authorization': function () { return null; } } });
        };

        return this;
    }
};

keepItApp.factory(factories);