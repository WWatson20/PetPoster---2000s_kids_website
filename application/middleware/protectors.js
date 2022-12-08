module.exports = {
    isLoggedIn : function (req, res, next){
        //if you have a username attached to the session you're fine
        if(req.session.username){
            next();
            //if not that means youre not logged in and you cant post
        }else{
            req.flash("error", "You must be logged in to post");
            req.session.save(function(saveError){
                res.redirect('/login')
            })
        }
    }
}