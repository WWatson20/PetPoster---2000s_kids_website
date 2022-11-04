var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PetPoster - Index', name:"William Watson", css:["Index.css"], js: ["index.js"]});
});

module.exports = router;

//get pages
router.get("/Login", function (req, res){
  res.render('login', {title: 'PetPoster - Login', css:["Forms.css"]});
});

router.get("/register", function (req, res){
  res.render('registration', {title: 'PetPoster - Register', css:["Forms.css"], js: ["Registration.js"] });
});

router.get("/Index", function (req, res){
  res.render('index', {title: 'PetPoster - Index', css:["Index.css"], js: ["index.js"]});
});

router.get("/Post", function (req, res){
  res.render('postimage', {title: 'PetPoster - Post', css:["Forms.css"]});
});

router.get("/posts/:id", function (req, res){
  res.render('viewpost', {title: 'PetPoster - Viewing Post', css:["viewpost.css"]});
});