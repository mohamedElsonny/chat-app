const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generareMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generareMessage('Admin', 'Welcome to chat app!'));

    socket.broadcast.emit('newMessage', generareMessage('Admin', 'New User joined'));


    socket.on('createMessage', (msg, callback) => {

        console.log('new message recived: ', msg);

        io.emit('newMessage', generareMessage(msg.from, msg.text));
        callback('This is agknowledg from the server.');


        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});