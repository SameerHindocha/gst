let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let morgan = require('morgan');


let app = express();
global.ROOT_PATH = __dirname;
const config = require('./config/environments');
global.config = config;

const path = require('path');
const fs = require('fs');

// app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

// app.set('trust proxy', 1) // trust first proxy

var sessionOptions = {
  name: 'session',
  secret: 'ScRcHp',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: "/",
    maxAge: 1800000, //30 mins
    httpOnly: true,
    // secure: true,
  }
};

app.use(session(sessionOptions));

app.use("/", express.static(path.join(ROOT_PATH, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());









require('./config/mongo');
// require('./config/express')(app);



let adminAPI = require('./admin-api');
new adminAPI(app);

let publicAPI = require('./public-api');
new publicAPI(app);



module.exports = app;
