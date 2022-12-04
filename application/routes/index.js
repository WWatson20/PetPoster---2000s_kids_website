var express = require('express');
const {isLoggedIn} = require('../middleware/protectors')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PetPoster - Index', name:"William Watson", css:["Index.css"], js: ["index.js"]});
});

module.exports = router;

//get pages

//Method: GET
//localhost:3000/login
router.get("/Login", function (req, res){
  res.render('login', {title: 'PetPoster - Login', css:["Forms.css"]});
});


//Method: GET
//localhost:3000/register
router.get("/register", function (req, res){
  ///Commented out Registration,.js for data entry purposes
  res.render('registration', {title: 'PetPoster - Register', css:["Forms.css"], /*js: ["Registration.js"]*/ });
});

//Method: GET
//localhost:3000/index
router.get("/Index", function (req, res){
  res.render('index', {title: 'PetPoster - Index', css:["Index.css"], js: ["index.js"]});
});

//Method: GET
//localhost:3000/post
router.get("/Post",isLoggedIn, function (req, res){
  res.render('postimage', {title: 'PetPoster - Post', css:["Forms.css"]});
});

//Method: GET
//localhost:3000/posts/:id
router.get("/posts/:id", function (req, res){
  res.render('viewpost', {title: 'PetPoster - Viewing Post', css:["viewpost.css"]});
});