$(document).ready(function() {

    var socket = io();

    socket.on('connect', function() {
        console.log('successfully connected to the server');
    });

    socket.on('newMessage', function(msg) {
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var li = $('<li></li>');
        var time = $('<span class="time"></span>');
        time.text(`${formattedTime}`);
        li.text(`${msg.from}: ${msg.text}`);
        li.append(time);
        $('#messages').append(li);
    });

    socket.on('newLocationMessage', (msg) => {
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var time = $('<span class="time"></span>');
        var cont = $('<div></div>');
        var li = $('<li></li>');
        var a = $('<a target="_blank">My Current Location</a>');

        cont.text(`${msg.from}: `);
        a.attr('href', msg.url);
        time.text(`${formattedTime}`);
        cont.append(a);
        li.append(cont);
        li.append(time);
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
            input.val('');
        });

    });

    var locationButton = $('#send-location');

    locationButton.on('click', function() {

        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }
        $(this).attr('disabled', 'disabled').text('Sending location...');

        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                lng: position.coords.longitude,
                lat: position.coords.latitude
            });
        }, function() {
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location');
        });

    });



});