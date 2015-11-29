
var factories = {
    Page: function () {
        var title = 'KeetItApp';
        return {
            title: function () { return title; },
            setTitle: function (newTitle) { title = newTitle }
        };
    }
};

keepItApp.factory(factories);