var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
	listName: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}]
})

var List = mongoose.model('List', listSchema);

module.exports = List;