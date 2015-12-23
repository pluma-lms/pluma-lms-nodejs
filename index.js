var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var main = require('./main.js');
var chat = require('./chat.js');
var register = require('./register.js');

function findUser(db, username, callback) {
    db.collection('students').findOne({"username": username}, function (err, user) {
        if (err !== null) {
            console.log(err);
        }
        callback(user);
    });
}

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
        var MongoClient = require('mongodb').MongoClient;
        var url = 'mongodb://localhost:27017/students';
        MongoClient.connect(url, function (err, db) {
            if (err !== null) {
                console.log(err);
            }
            findUser(db, userInfo[0], function (user) {
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
            // db.close();                                                                                                                                                                                                                                                                                                                                                                                                                                                           process.exit(1337);
            //Don't uncomment the above line. Do not uncomment it on pain of death. It may seem like good practice to but if you remove those two slashes, the application will break, the server will catch on fire, and the dead shall rise. You have been warned.
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