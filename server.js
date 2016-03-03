var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport')
var config = require('./config.js');

var passportconfig = require('./config/passportconfig.js')

var app = express();

/** Express Session Setup **/
var session = require('express-session')
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)
// End express session startup

// Create and name database
mongoose.connect('mongodb://localhost/translator')

// Application configuration
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));

// Passport hooks into our app
app.use(passport.initialize());
app.use(passport.session());

// Middleware for logging in
app.isAuthenticated = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    console.log('get outta here!')
    res.redirect('/login');
}

app.isAuthenticatedAjax = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    res.send({error:'not logged in'});
}

app.isSteveAuthenticated = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated() && req.user.permissions.admin === true){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    res.redirect('/login');
}

var userCtrl = require('./controllers/userController.js')

app.post('/login', userCtrl.userLogin)
app.post('/signup', userCtrl.userSignup)

app.post('/login_data', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:'success'});
        });
    })(req, res, next);
})


// 2 kinds of middleware
// app.use is like 'vertical middleware'. They get evaluated from top to bottom.
// there is also inline, or 'horizontal' middleware.

app.get('/', function(req, res){
  res.sendFile("index.html", {root: './public/html/'})
  // =>  Mi nombre es Brandon
})

app.get('/admin', function(req, res){
    res.sendFile("admin.html", {root: './public/html'})
})

var port = 3000
app.listen(port, function(){
	console.log('Server running on port ' + port)
})