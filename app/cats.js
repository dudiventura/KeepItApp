venues = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4'
};

$(function () {

    var venueContainer = $('#venues ul');
    $.each(venues, function (key, item) {
        venueContainer.append(
            $(document.createElement("li"))
            .append(
                $(document.createElement("input")).attr({
                    id: 'venue-' + key
                    , name: item
                    , value: item
                    , type: 'checkbox'
                    , checked: true
                })
                .change(function () {
                    var cbox = $(this)[0];
                    var segments = wheel.segments;
                    var i = segments.indexOf(cbox.value);

                    if (cbox.checked && i == -1) {
                        segments.push(cbox.value);

                    } else if (!cbox.checked && i != -1) {
                        segments.splice(i, 1);
                    }

                    segments.sort();
                    wheel.update();
                })

            ).append(
                $(document.createElement('label')).attr({
                    'for': 'venue-' + key
                })
                .text(item)
            )
        )
    });


});