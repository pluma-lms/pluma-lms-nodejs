var fs = require('fs');
var db = require('./includes/db.js');
function main(io, socket) {
    fs.readFile('./register.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        socket.emit('page', data);
    });
    socket.on('register', function (userInfo) {
        db.registerUser(userInfo);
    });
}
module.exports.main = main;