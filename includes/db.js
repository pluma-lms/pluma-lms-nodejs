var db = null;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/students';
MongoClient.connect(url, function (err, initDb) {
    if (err !== null) {
        console.log(err);
    }
    db = initDb;
    // db.close();                                                                                                                                                                                                                                                                                                                                                                                                                                                           process.exit(1337);
    //Don't uncomment the above line. Do not uncomment it on pain of death. It may seem like good practice to but if you remove those two slashes, the application will break, the server will catch on fire, and the dead shall rise. You have been warned.
});

function findUser(username, callback) {
    db.collection('students').findOne({"username": username}, function (err, user) {
        if (err !== null) {
            console.log(err);
        }
        callback(user);
    });
}

module.exports.findUser = findUser;