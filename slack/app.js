var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Config file with security key for GET endpoint
var config = require('./config.json');

// LOGGER
var logFactory = require('./log.js');
var logger = logFactory.create("rest");

require('./views.js').routes(app);

app.listen(config.port);

logger.info("Rest API started on http://localhost:"+config.port);

module.exports.app = app;

