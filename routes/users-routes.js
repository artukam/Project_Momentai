var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../models');
var authMiddleware = require('../middleware/auth');

//INDEX
router.get('/index', authMiddleware.loginRequired, function(req,res,next){
	db.User.findOne({_id: req.session.user_id}).then(function(user){
		let currentUser = user;
		res.render('users/index', {currentUser})
	})
})

//LOGIN/NEW
router.get('/login', function(req,res,next){
	res.render('./home')
})

//CREATE (New user)
router.post('/signup', function(req,res,next){
	db.User.create(req.body).then(function(user){
		res.redirect('/users/login');
	})
})

//LOGIN USER
router.post('/login', function(req,res,next){
	db.User.findOne({username: req.body.username}).then(function(user){
		user.comparePassword(req.body.password, function(err, isMatch){
			if(isMatch) {
				req.session.user_id = user.id;
				req.flash('message', 'logged in!');
				res.redirect('/users/index');
			} else {
				req.flash('message','invalid credentials!');
				res.redirect('/users/login');
			}
		})
	}, function(err) {
		res.send(err);
	})
})

//LOGOUT USER
router.post('/logout', function(req,res,next){
	req.session.user_id = null;
	req.flash('message', 'logged out!');
	res.redirect('/users/login');
})

//SHOW
router.get('/:id', function(req,res,next){
	db.User.findOne({_id: req.params.id}).then(function(user){
		let foundUser = user;
		res.render('users/show', {foundUser})
	})
})

//EDIT
router.get('/:id/edit', function(req,res,next){
	db.User.findOne({_id: req.params.id}).then(function(user){
		let foundUser = user;
		res.render('users/edit', {foundUser})
	})
})

//PATCH
router.patch('/:id', function(req,res,next){
	db.User.findByIdAndUpdate(req.params.id, req.body).then(function(data){
		req.flash('message', 'details updated')
		res.redirect('/users/index')
	})
})

//DELETE
router.delete('/:id', function(req,res,next){
	db.User.findByIdAndRemove(req.params.id).then(function(data){
		req.session.user_id = null;
		req.flash('message', 'user deleted');
		res.redirect('/users/login');
	})
})

module.exports = router;