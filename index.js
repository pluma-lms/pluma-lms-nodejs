var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chat = require('./chat.js');
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); //sets initial HTML page
});

io.on('connection', function (io,socket) {
    socket.on('login', function (username) {
        if (username === 'user')
        {
            console.log("LOGIN");
            chat.main(socket);
        }
    });
});

http.listen(9000, function () {
    console.log('listening on port 9000');
});
