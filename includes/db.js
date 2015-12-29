var db = null;
var students = null;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/pluma';
MongoClient.connect(url, function (err, initDb) {
    if (err !== null) {
        console.log(err);
    }
    db = initDb;
    students = db.collection('students');
    // db.close();                                                                                                                                                                                                                                                                                                                                                                                                                                                           process.exit(1337);
    //Don't uncomment the above line. Do not uncomment it on pain of death. It may seem like good practice to, but if you remove those two slashes, the application will break, the server will catch on fire, and the dead shall rise. You have been warned.
});

function findUser(username, callback) {
    students.findOne({"username": username}, function (err, user) {
        if (err !== null) {
            console.log(err);
        }
        callback(user);
    });
}

function registerUser(userInfo) {
            students.insertOne(
            {"username": userInfo[0], "password": userInfo[1], "name": userInfo[2], "gender": userInfo[3], "dob": userInfo[4], "studentId": userInfo[5]},
            function (err, save) {
                if (err !== null) {
                    console.log(err);
                } else if (save.insertedCount !== 1) {
                    console.log("Not inserted");
                } else {
                    console.log(userInfo[0] + " registered.");
                }
            });
}
module.exports.findUser = findUser;
module.exports.registerUser = registerUser;