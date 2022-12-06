const db = require('../conf/database');
const UserError = require('../helpers/error/UserError');
module.exports={
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

    getPostById : function (req, res,next){
            let postId = req.params.id;
            let baseSQL =`select p.title,p.description,p.image,p.createdAt,u.username from posts p join users u on p.fk_authorID=u.id where p.id=?;`;

            db.query(baseSQL, [postId])
                .then(function ([results,fields]){
                        if(results && results.length!=1){
                            throw new UserError('Post could not be found', "/", 200);
                        }else{
                                res.locals.currentPost = results[0];
                            }
                        next();
                }).catch(function(err){
                if(err instanceof  UserError){
                    req.flash('error', err.getMessage());
                    req.session.save(function(saveErr){
                        res.redirect(err.getRedirectURL());
                    })
                }else{
                    next(err);
                }
            })
    },

}