
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
            $location.url(view);
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
    },
    Snooze: function () {
        this.addSnooze = function () { //title,text,firstAt,every,sound,icon,data
            self = this;
            var id = (localStorage.getItem('snoozeIds') == undefined) ? 1 : self.getLastId();

            cordova.plugins.notification.local.schedule({
                id: id,
                title: "Production Jour fixe",
                text: "Duration 1h",
                firstAt: monday_9_am,
                every: "week",
                sound: "file://sounds/reminder.mp3",
                icon: "http://icons.com/?cal_id=1",
                data: { meetingId: "123#fg8" }
            });

            cordova.plugins.notification.local.on("click", function (notification) {
                alert(notification.data.meetingId);
            });
        }

        this.getLastId = function () {
            var ids = localStorage.getItem('snoozeIds').split(',');
            var lastId = ids[ids.length - 1];
            ids.push((lastId * 1) + 1);
            localStorage.set('snoozeIds', ids.join());
            return lastId;
        }

        return this;
    }
};

keepItApp.factory(factories);

