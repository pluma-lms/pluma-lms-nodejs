var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
function main()
{
    console.log('init chat');
    var nick = socket.request.connection.remoteAddress;
    var title = 'Chat';
    io.emit('title', title);
    console.log(nick + ':' + socket.request.connection.remotePort + ' connected.');
    socket.on('chat message', function (msg) {
        var command = msg.substring(0, msg.indexOf(' '));
        var params = msg.substring(msg.indexOf(' ') + 1, msg.length);
        switch (command) {
            case '/nick':
                var newNick = params;
                io.emit('servermsg', nick + ' changed his name to ' + newNick);
                nick = newNick;
                break;
            case '/title':
                io.emit('title', params);
                io.emit('servermsg', nick + ' changed the title to ' + params);
                break;
            default:
                console.log(nick + ': ' + msg);
                io.emit('servermsg', nick + ': ' + msg);
        }
    });
    socket.on('disconnect', function () {
        console.log(nick + ' disconnected.');
    });
}
