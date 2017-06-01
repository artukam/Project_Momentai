var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	task: String,
	isActive: {
		type: Boolean,
		default: true
	},
	isDue: Date,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

var Task = mongoose.model('Task', taskSchema);

module.exports = Task