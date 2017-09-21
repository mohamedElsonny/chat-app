$(document).ready(function() {

    var socket = io();

    socket.on('connect', function() {
        console.log('successfully connected to the server');
    });

    socket.on('newMessage', function(msg) {
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var template = $('#message-template').html();
        var html = Mustache.render(template, {
            text: msg.text,
            createdAt: formattedTime,
            from: msg.from
        });

        $('#messages').append(html);
    });

    socket.on('newLocationMessage', (msg) => {
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var template = $('#message-location-template').html();
        var html = Mustache.render(template, {
            url: msg.url,
            createdAt: formattedTime,
            from: msg.from
        });

        $('#messages').append(html);
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