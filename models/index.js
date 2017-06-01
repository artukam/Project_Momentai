var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/momentai_app');

mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.Task = require("./task");
module.exports.List = require("./list");