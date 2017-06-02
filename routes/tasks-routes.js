var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../models');
var authMiddleware = require('../middleware/auth');

//INDEX / NEW / SHOW - Not required, one screen view

//CREATE
router.post('/new', function(req,res,next){
	var newTask = new db.Task(req.body);
	db.List.findOne({_id: req.body.list}).then(function(list) {
		newTask.save().then(function(createdTask){
			list.tasks.push(createdTask._id)
			list.save().then(function(){
				res.sendStatus(200);
			})
		})
	})
});

//PATCH
router.patch('/:id', function(req,res,next){
	db.Task.findByIdAndUpdate(req.params.id, req.body).then(function(data){
		res.sendStatus(200);
	})
})
//DELETE
router.delete('/:id', function(req,res,next){
	db.Task.findByIdAndRemove(req.params.id).then(function(date){
		res.sendStatus(200);
	})
})

//COMPLETE
router.patch('/:id/complete', function(req,res,next){
	db.Task.findByIdAndUpdate(req.params.id, { isActive: false }).then(function(task){
		res.sendStatus(200);
	})
})
module.exports = router;