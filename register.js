var fs = require('fs');

function main(io, socket) {
    fs.readFile('./register.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        socket.emit('page', data);
    });
    socket.on('register', function () {
        console.log(nick + ' disconnected.');
    });
}
module.exports.main = main;