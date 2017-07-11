 var ENV = process.env.NODE_ENV || 'development';

 var path = require('path');
 var config = require(`./${ENV}.json`);
 console.log("config", config);
 config.root = config.root || path.join(ROOT_PATH, '..');
 console.log("config.root", config.root);
 module.exports = config;
 console.log("config", config);
