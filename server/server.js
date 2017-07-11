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
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
// var port = process.env.NODE_ENV || 'development';
global.config = require(__dirname + '/config/development');
console.log("global.config", global.config);
app.use("/", express.static(path.join(ROOT_PATH, '..', 'public')));
app.use(require('./admin-api'));
app.use(require('./public-api'));
app.listen(config.server.port);
