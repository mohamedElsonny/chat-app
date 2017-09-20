const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));


    socket.on('createMessage', (msg, callback) => {

        console.log('new message recived: ', msg);

        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});