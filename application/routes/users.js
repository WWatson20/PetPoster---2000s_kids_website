var express = require('express');
var router = express.Router();
const db = require('../conf/database');   //import from database.js the connection to the sql database
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError')

//Method:POST
//localhost:3000/users/registration
router.post("/register", function(req, res, next){
  const{username, email, password} = req.body
  //server side validation
            ///appropriate response
    // check for duplicates
db.query("select id from users where username=?", [username])        //sends code to sql console
            .then(function ([results, fields]){
                                //if there's no account with this username
                                if(results && results.length === 0){
                                    //check if there's an account with this email
                                        return db.query('select id from users where email=?', [email])
                                    //if the request returns an account with this username
                                }else{
                                    //throw an error
                                    throw new UserError('Failed Register: Username already in use', "../Register", 200);
                                }
            }).then(function([results,fields]){
                        //if there's no accounts with this email
                            if(results && results.length === 0){
                                //hashes the password
                                    return bcrypt.hash(password, 2);
                                //if there is an account with this email
                            }else{
                                //throw an error
                                throw new UserError('Failed Register: Email already in use', "../Register", 200);
                            }
                            //inserts the hashed password
            }).then(function (hashedPassword){
    return db.query('insert into users (username, email, password) value(?,?,?)' ,[username, email, hashedPassword])
}).then(function([results,fields]) {
                //if rows have been changed (user has been added)
                if (results && results.affectedRows){
                    ///redirect to login page
                        res.redirect('/login');
                        ///if user was not made for some reason
                }else{
                    //throw generic error
                    throw new UserError('User could not be made', "../Register", 200);
                }
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


});

//Method:POST
//localhost:3000/users/login
router.post("/login", function(req, res, next){
        const {username, password} = req.body;
        let loggedUserId;
        let loggedUsername;

        db.query('select id, username, password from users where username=?', [username])
            .then(function([results, fields]){
                        if(results && results.length ===1){
                            loggedUserId = results [0].id;
                            loggedUsername = results[0].username;
                                let dbPassword = results[0].password;
                                return bcrypt.compare(password, dbPassword);
                        } else{
                            throw new UserError('Failed Login: Invalid user credentials', "../login", 200);
                        }
            })
            .then(function (passwordsMatched){
                if(passwordsMatched){
                    req.session.userId = loggedUserId;
                    req.session.username = loggedUsername;
                    req.flash("success", `Hello, ${loggedUsername}, you are now logged in.`);
                    req.session.save(function (saveErr){
                        res.redirect('/')
                    })
                    res.redirect('/');
                }else{
                    throw new UserError('Failed Login: Invalid user credentials', "../login", 200);
                }
            })
            .catch(function(err){
                if(err instanceof  UserError){
                    req.flash('error', err.getMessage());
                    req.session.save(function(saveErr){
                        res.redirect(err.getRedirectURL());
                    })
                }else{
                    next(err);
                }
            })
});

//Method:POST
//localhost:3000/users/login
router.post("/logout", function(req, res, next) {
    req.session.destroy(function (destroyError){
        if(destroyError){
            next(err);
        }else{
            res.json({
                status: 200,
                message: "You have been logged out"
            });
        }
    })
});

module.exports = router;
