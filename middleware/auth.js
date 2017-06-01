exports.loginRequired = function(req, res, next){
    if(!req.session.passport.user){
        req.flash('message', 'Please log in!')
        res.redirect('/users/login');
    } else {
        next();
    }
}

exports.ensureCorrectUser = function(req,res,next) {
	if(req.params.user_id !== req.session.passport.user) {
		req.flash('message','Not Authorised');
		res.redirect('/');
	} else {
		next();
	}
}

