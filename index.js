var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var main = require('./main.js');
var chat = require('./chat.js');
var register = require('./register.js');
var db = require('./includes/db.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/main.css', function (req, res) {
    res.sendFile(__dirname + '/includes/resources/main.css');
});
app.get('/includes/assets/plumalms-logo.png', function (req, res) {
    res.sendFile(__dirname + '/includes/assets/plumalms-logo.png');
});
app.get('/includes/assets/bookman.ttf', function (req, res) {
    res.sendFile(__dirname + '/includes/assets/bookman.ttf');
});
io.on('connection', function (socket) {
    socket.on('login', function (userInfo) {
        db.findUser(userInfo[0], function (user) {
            if (user === null) {
                console.log("USER NOT FOUND");
            } else
            {
                if (userInfo[1] === user.password)
                {
                    main.main(io, socket);
                }
            }
        });
    });
    socket.on('chat', function () {
        chat.main(io, socket);
    });
    socket.on('register', function () {
        register.main(io, socket);
    });
});
http.listen(9000, function () {
    console.log('listening on port 9000');
});