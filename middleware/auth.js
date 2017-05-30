exports.loginRequired = function(req, res, next){
    if(!req.session.user_id){
        req.flash('message', 'Please log in!')
        res.redirect('/users/login');
    } else {
        next();
    }
}

exports.ensureCorrectUser = function(req,res,next) {
	if(req.params.user_id !== req.session.user_id) {
		req.flash('message','Not Authorised');
		res.redirect('/');
	} else {
		next();
	}
}

