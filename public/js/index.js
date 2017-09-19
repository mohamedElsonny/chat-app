var socket = io();

socket.on('connect', function() {
    console.log('successfully connected to the server');

});

socket.on('newMessage', function(msg) {
    console.log('new message recived: ', msg);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});