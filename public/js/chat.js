$(document).ready(function() {

    var socket = io();


    function scrollToBottom() {
        //selectors
        var messages = $('#messages');
        var newMessage = messages.children('li:last-child');

        //heights
        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();

        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop(scrollHeight);
        }


    }


    socket.on('connect', function() {
        var params = $.deparam(window.location.search);

        socket.emit('join', params, function(err) {
            if (err) {
                alert(err);
                window.location.href = '/';
            } else {
                console.log('No Error');
            }
        });
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
        scrollToBottom();
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
        scrollToBottom();
    });


    socket.on('disconnect', function() {
        console.log('Disconnected from server');
    });

    socket.on('updateUserList', function(users) {
        var ol = $('<ol></ol>');

        users.forEach(function(user) {
            ol.append($('<li></li>').text(user));
        });

        $('#users').html(ol);
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