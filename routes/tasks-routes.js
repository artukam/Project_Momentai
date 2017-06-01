var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../models');
var authMiddleware = require('../middleware/auth');

//INDEX / NEW / SHOW - Not required, one screen view

//CREATE
router.post('/new', function(req,res,next){
	var newTask = new db.Task(req.body);
	newTask.user = req.user;
	db.User.findOne({_id: req.user}).then(function(user){
		newTask.save().then(function(createdTask){
			user.tasks.push(createdTask._id)
			user.save().then(function(){
				res.redirect(`/users/${user.id}/tasks`);
			})
		})
	})
});

//PATCH
router.patch('/:id', function(req,res,next){
	db.Task.findByIdAndUpdate(req.params.id, req.body).then(function(data){
		db.User.findOne({_id: req.session.passport.user}).then(function(user){
			req.flash('message', 'task updated')
			res.redirect(`/users/${user.id}/tasks`)
		})
	})
})
//DELETE
router.delete('/:id', function(req,res,next){
	db.Task.findByIdAndRemove(req.params.id).then(function(date){
		db.User.findOne({_id: req.session.passport.user}).then(function(user){
			req.flash('message', 'task deleted')
			res.redirect(`/users/${user.id}/tasks`)
		})
	})
})

//COMPLETE
router.patch('/:id/complete', function(req,res,next){
	db.Task.findByIdAndUpdate(req.params.id, { isActive: false }).then(function(task){
		req.flash('message', 'task completed')
		res.sendStatus(200);
	})
})
module.exports = router;