const db = require('../conf/database');
const UserError = require('../helpers/error/UserError');

module.exports={

    ///Used on index to fetch the most recent posts
    getRecentPosts: function (req,res,next){
            db.query('select id,title,description,thumbnail from posts ORDER BY createdAt DESC LIMIT 10')
                .then(function([results, fields]){
                        if(results && results.length){
                            res.locals.results = results;
                        }
                        next();
                })
                .catch(err => next(err));
    },


    /// Used on viewPost to fetch the specific post by id
    getPostById : function (req, res,next){
            let postId = req.params.id;
            let baseSQL =`select p.id,p.title,p.description,p.image,p.createdAt,u.username from posts p join users u on p.fk_authorID=u.id where p.id=?;`;

            db.query(baseSQL, [postId])
                .then(function ([results,fields]){
                    //if no results
                        if(results && results.length!=1){
                            //throw error
                            throw new UserError('Post could not be found', "/", 200);
                        }else{
                            //else show item 0 of currentpost
                                res.locals.currentPost = results[0];
                            }
                        next();
                }).catch(function(err){
                    //if there's an error
                if(err instanceof  UserError){
                    //flash that message
                    req.flash('error', err.getMessage());
                    //save because we're going to redirect
                    req.session.save(function(saveErr){
                        res.redirect(err.getRedirectURL());
                    })
                }else{
                    next(err);
                }
            })
    },
    //used on ViewPost to get comments for a specific Id
    getCommentsForPostById : function (req, res, next){
        let postId = req.params.id;
        let baseSQL =  `select c.id, c.text, c.createdAt, u.username 
            FROM comments c 
            Join users u 
            ON c.fk_authorId=u.id 
            where fk_postId=? ORDER BY createdAt DESC;`
        db.execute(baseSQL, [postId])
            .then(function ([results, fields]){
                res.locals.currentPost.comments = results;
                next();
            })
            .catch(err => next(err))
}
}