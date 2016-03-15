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
mongoose.connect('mongodb://localhost/gamebyrd')

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
})

app.get('/admin', function(req, res){
    res.sendFile("admin.html", {root: './public/html'})
})

// Routes to post new information to data base
var videogameController = require("./controllers/videogameController.js")
var consoleController = require("./controllers/consoleController.js")
var accessoryController = require("./controllers/accessoryController.js")
var addToCartController = require("./controllers/addToCartController.js")
var searchController = require("./controllers/searchController.js")
var getcartController = require("./controllers/getcartController.js")
var updateuserController = require("./controllers/updateuserController.js")
var checkoutController = require("./controllers/checkoutController.js")
var paymentController = require("./controllers/paymentController.js")

app.post('/api/addGame', videogameController.addGame)
app.post('/api/addConsole', consoleController.addConsole)
app.post('/api/addAccessory', accessoryController.addAccessory)

// Routes to query database for information
var custhomeController = require("./controllers/custhomeController.js")
app.get('/getGamesList', custhomeController.getGamesList);
app.get('/getConsolesList', custhomeController.getConsolesList);
app.get('/getAccessoriesList', custhomeController.getAccessoriesList);
app.get('/getTopGames', custhomeController.getTopGames);
app.get('/getTopConsoles', custhomeController.getTopConsoles);


app.get('/api/me', getcartController.getUser)
// app.get('/api/me', getcartController.getCart)

app.post('/api/addToCart', addToCartController.addToCart)
app.post('/api/search', searchController.search)

app.post('/api/updateUser', updateuserController.updateUser)

// Add and delete cart items
app.post('/api/updateCart', checkoutController.updateCart)
app.post('/api/deleteItem', checkoutController.deleteItem)

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// Stripe Payments
app.post('/api/charge', paymentController.charge)






var port = 3000
app.listen(port, function(){
	console.log('Server running on port ' + port)
})