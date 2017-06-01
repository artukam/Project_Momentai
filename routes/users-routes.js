var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../models');
var authMiddleware = require('../middleware/auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//PASSPORT
passport.use(new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},

	function verifyCallback(req, username, password, done) {
		db.User.findOne({username: username}, function(err,user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null,false);
			}
			user.comparePassword(password, function(err, isMatch) {
				if(isMatch) {
					return done(null,user);
				} else {
					return done(null,false);
				}
			})
		})
	}

	));

passport.serializeUser(function(user,done) {
	done(null, user.id);
})

passport.deserializeUser(function(id,done) {
	db.User.findById(id).then(function(user){
		done(null,user);
	});
});

//INDEX
router.get('/index', authMiddleware.loginRequired, function(req,res,next){
	db.User.findOne({_id: req.session.passport.user}).then(function(user){
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
router.post('/login',
			passport.authenticate('local', {successRedirect: '/users/index' , failureRedirect: '/users/login'}));

//LOGOUT USER
router.post('/logout', function(req,res,next){
	req.logout();
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
		res.redirect('users/login');
	})
})

module.exports = router;