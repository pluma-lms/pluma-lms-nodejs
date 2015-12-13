var fs = require('fs');

function main (io,socket) {
     fs.readFile('./main.html', 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                }
                socket.emit('page', data);
            });
    socket.on('requestPage',function(page)
    {
        fs.readFile('./includes/pages/'+page+'.html', 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                }
                callback(data);
            });
    });
}

module.exports.main = main;