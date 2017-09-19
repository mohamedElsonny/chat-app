const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
        from: 'moElsonny@gmail.com',
        text: 'text from moElsonny email',
        createdAt: new Date()
    });

    socket.emit('newMessage', {
        from: 'mohamed gamal',
        text: 'hi allaa, i love you so much <3',
        createdAt: new Date()
    });

    socket.on('createEmail', (email) => {
        console.log('created email', email);
    });

    socket.on('createMessage', (msg) => {
        console.log('new message recived: ', msg);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});