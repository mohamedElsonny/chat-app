$(document).ready(function() {

    var socket = io();

    socket.on('connect', function() {
        console.log('successfully connected to the server');
    });

    socket.on('newMessage', function(msg) {

        var li = $('<li></li>');
        li.text(`${msg.from}: ${msg.text}`);
        $('#messages').append(li);
    });

    socket.on('newLocationMessage', (msg) => {
        var li = $('<li></li>');
        var a = $('<a target="_blank">get location</a>');

        li.text(`${msg.from}: `);
        a.attr('href', msg.url);
        li.append(a);
        $('#messages').append(li);
    });


    socket.on('disconnect', function() {
        console.log('Disconnected from server');
    });

    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        let input = $(this).find('[name=message]');
        let text = input.val();
        socket.emit('createMessage', {
            from: 'User',
            text
        }, function() {

        });

        input.val('');
    });

    var locationButton = $('#send-location');

    locationButton.on('click', function() {

        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit('createLocationMessage', {
                lng: position.coords.longitude,
                lat: position.coords.latitude
            });
        }, function() {
            alert('Unable to fetch location');
        });
    });



});