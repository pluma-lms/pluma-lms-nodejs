var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var chat = require('./chat.js');
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); //sets initial HTML page
});

io.on('connection', function (socket) {
    socket.on('login', function (username) {
        if (username === 'user')
        {
            console.log("LOGIN");
            fs.readFile('./chat.html', 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                }
                socket.emit('page', data);
                chat.main(socket);
            });
        }
    });
});

http.listen(9000, function () {
    console.log('listening on port 9000');
});
