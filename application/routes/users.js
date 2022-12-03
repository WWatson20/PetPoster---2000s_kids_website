var express = require('express');
var router = express.Router();
const db = require('../conf/database');   //import from database.js the connection to the sql database
const bcrypt = require('bcrypt');

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
                                    throw new Error('Username already in use');
                                }
            }).then(function([results,fields]){
                        //if there's no accounts with this email
                            if(results && results.length === 0){
                                //hashes the password
                                    return bcrypt.hash(password, 2);
                                //if there is an account with this email
                            }else{
                                //throw an error
                                throw new Error('Email already in use');
                            }
                            //inserts the hashed password
            }).then(function (hashedPassword){
    return db.query('insert into users (username, email, password) value(?,?,?)' ,[username, email, hashedPassword])
}).then(function([results,fields]) {
                //if rows have been changed (user has been added)
                if (results && results.affectedRows){
                    ///redirect to login page
                        res.redirect('/login');
                        ///if user was not made
                }else{
                    //throw error
                    throw new Error('User could not be made');
                }
            }).catch(function(err){
                res.redirect('/register');
                next(err);
            });


});

//Method:POST
//localhost:3000/users/login
router.post("/login", function(req, res, next){
        const {username, password} = req.body;
        db.query('select id, username, password from users where username=?', [username])
            .then(function([results, fields]){
                        if(results && results.length ===1){
                                let dbPassword = results[0].password
                                return bcrypt.compare(password, dbPassword);
                        } else{
                            throw new Error('Invalid user credentials');
                        }
            })
            .then(function (passwordsMatched){
                if(passwordsMatched){
                    res.redirect('/');
                }else{
                    throw new Error('Invalid user credentials');
                }
            })
            .catch(function(err){
                next(err);
            })
});





module.exports = router;
