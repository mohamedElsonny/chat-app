var socket = io();

socket.on('connect', function() {
    console.log('successfully connected to the server');

});

socket.on('newMessage', function(msg) {
    console.log('new message recived: ', msg);

    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#messages').append(li);
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $(this).find('[name=message]').val()
    }, function(data) {
        console.log('data', data);
    });
});