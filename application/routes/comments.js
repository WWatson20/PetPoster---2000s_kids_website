const express = require('express');
const router = express.Router();
const db = require('../conf/database');


router.post("/create", function(req,res,next){
        if(!req.session.userId){
                req.flash("error", "You must be logged in to comment");
                                req.session.save(function (saveError){

                })
        }else{
                let {comment, postId} = req.body;
                let {userId, username} = req.session;
                db.execute(`INSERT INTO comments (text, fk_authorId, fk_postId) value (?,?,?);`,[comment,userId,postId])
                    .then(function ([results,fields]){
                            if(results && results.affectedRows ===1){
                                    res.json({
                                            data: {
                                                    comment : comment,
                                                    username: username,
                                                    commentId : results.insertId
                                            }
                                    })
                                    req.flash("success",  "Your comment was created");
                                                req.session.save(function (saveError){
                                    })
                            }else{
                                    req.flash("error", "Comment could not be created");
                                                req.session.save(function (saveError){
                                    })
                            }
                    })
        }
})





module.exports = router