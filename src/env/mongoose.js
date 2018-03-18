import {conf} from "../env/config";
var mongoose = require('mongoose')
module.exports = function () {
    console.log("mongo DB connection", conf.db)
    var mongoDB = conf.db;
    mongoose.connect(mongoDB, {
        useMongoClient: true
    });
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
   //Get the default connection
    var db = mongoose.connection;
   //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return db
};
