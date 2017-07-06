// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var session = require('express-session');

var bodyParser = require('body-parser');
var app = express();
global.ROOT_PATH = __dirname;
var morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// configure app
// app.use(morgan('dev')); // log requests to the console
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));


// var sess;
// app.get('/', function (req, res) {
//   sess = req.session;
//   console.log("sess", sess.email);
// });



// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.NODE_ENV || 'development';
var tmp = require(__dirname + '/config/' + port);
app.use("/", express.static(path.join(ROOT_PATH, '..', 'public')));
app.use(require('./admin-api/user'));
app.use(require('./admin-api/auth'));

app.use(require('./public-api'));
app.listen(tmp.server.port);
