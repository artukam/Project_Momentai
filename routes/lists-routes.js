var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../models');
var authMiddleware = require('../middleware/auth');

//INDEX/NEW/SHOW
router.get('/', authMiddleware.loginRequired, function(req,res,next) {
	db.User.findOne({_id: req.session.passport.user}).populate('tasks lists').exec().then(function(user) {
		let currentUser = user;
		res.render('task_home',{currentUser});
	})
})

//CREATE
router.post('/new', function(req, res, next){
	var newList = new db.List(req.body);
	newList.user = req.user;
	db.User.findOne({_id:req.user}).then(function(user){
		newList.save().then(function(createdList){
			user.lists.push(createdList._id)
			user.save().then(function(){
				res.sendStatus(200);
			})
		})
	})
})

//PATCH
router.patch('/:id', function(req, res, next) {
	db.List.findByIdAndUpdate(req.params.id, req.body).then(function(list) {
		res.sendStatus(200);
	})
})


//DELETE
router.delete('/:id', function(req, res, next) {
	db.List.findByIdAndRemove(req.params.id).then(function(list){
		res.sendStatus(200);
	})
})


module.exports = router;