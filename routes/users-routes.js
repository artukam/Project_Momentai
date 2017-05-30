var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../models');

//WELCOME
router.get('/', function(req,res,next){
	res.render('users/welcome')
})

//LOGIN
router.get('/login', function(req,res,next){
	res.render('users/login')
})

//NEW (Create user)
router.get('/signup', function(req,res,next){
	res.render('users/new')
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
				res.redirect('/users')
			} else {
				res.redirect('/users/login')
			}
		})
	}, function(err) {
		res.send(err);
	})
})
//SHOW

//EDIT

//PATCH

//DELETE

module.exports = router;