var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var main = require('./main.js');
var chat = require('./chat.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); //sets initial HTML page
});

app.get('/main.css', function (req, res) {
    res.sendFile(__dirname + '/includes/resources/main.css'); //sets initial HTML page
});

app.get('/includes/assets/plumalms-logo.png', function (req, res) {
    res.sendFile(__dirname + '/includes/assets/plumalms-logo.png'); //sets initial HTML page
});

app.get('/includes/assets/bookman.ttf', function (req, res) {
    res.sendFile(__dirname + '/includes/assets/bookman.ttf'); //sets initial HTML page
});

io.on('connection', function (socket) {
    socket.on('login', function (userInfo) {
        if (userInfo[0] === 'user')
        {
            console.log("LOGIN");
            main.main(io, socket);
        }
    });

    socket.on('chat', function () {
        chat.main(io, socket);
    });
});

http.listen(9000, function () {
    console.log('listening on port 9000');
});
