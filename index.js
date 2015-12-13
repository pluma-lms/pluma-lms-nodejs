var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var main = require('./main.js');
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); //sets initial HTML page
});
app.get('/javascript.js', function (req, res) {
    res.sendFile(__dirname + '/javascript.js'); 
});

app.get('/css.css', function (req, res) {
    res.sendFile(__dirname + '/css.css'); //sets initial HTML page
});
io.on('connection', function (socket) {
    socket.on('login', function (username) {
        if (username === 'user')
        {
            console.log("LOGIN");
            main.main(io,socket);
        }
    });
});

http.listen(9000, function () {
    console.log('listening on port 9000');
});
