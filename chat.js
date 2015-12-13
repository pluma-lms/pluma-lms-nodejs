var fs = require('fs');

function main (io,socket) {
     fs.readFile('./chat.html', 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                }
                socket.emit('page', data);
            });
    var nick = socket.request.connection.remoteAddress;
    var title = 'Chat';
    socket.emit('title', title);
    socket.emit('servermsg','Welcome '+nick+'.');
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
module.exports.main = main;