var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	taskName: String,
	isActive: {
		type: Boolean,
		default: true
	},
	isDue: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	list: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'List'
	}
})

var Task = mongoose.model('Task', taskSchema);

module.exports = Task