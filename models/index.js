var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/momentai_app');

mongoose.Promise = Promise;

module.exports.User = require("./user");