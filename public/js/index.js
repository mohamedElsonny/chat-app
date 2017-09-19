var socket = io();

socket.on('connect', function() {
    console.log('successfully connected to the server');

    socket.emit('createEmail', {
        to: 'moElsonny@gmail.com',
        text: 'hey yooo',
        createdAt: new Date()
    });

    socket.emit('createMessage', {
        from: 'allaa ali hassan',
        text: 'oh mohamed i love you to <3'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


socket.on('newEmail', function(data) {
    console.log('New Email', data);
});

socket.on('newMessage', function(msg) {
    console.log('new message recived: ', msg);
});