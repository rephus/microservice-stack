var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var request = require('superagent');
app.use(bodyParser.json());

//Config file with security key for GET endpoint
var config = require('./config.json');

// LOGGER
var logFactory = require('./log.js');
var logger = logFactory.create("gateway");

app.use('/', express.static(__dirname + '/public'));

app.use('/health', function (req, res) {
  var health = {};

  var isSent = false;

  var services = config.services;
  console.log("Checking services " + services);

  function requestHealth(service) {
    var startRequest = (new Date()).getTime();
    var url = 'http://' + service + '/ping';
    console.log("Requesting " + url);
    request.get(url, function (err, response) {
      var endRequest = (new Date()).getTime();

      health[service] = {
        time: endRequest - startRequest
      }

      if (err) health[service].error = err;
      else health[service].response = response.body.response;

      // Check if all healthchecks have been collected
      if (Object.keys(health).length == services.length) {
        res.json(health);
        isSent = true;
      }
    });
  }
  for (var i = 0; i < services.length; i++) {
    var service = services[i];
    requestHealth(service);
  }

  //Timeout
  setTimeout(function () {
    if (isSent) return;
    res.json({
      error: "timeout",
      health: health
    }, 500);
  }, 5000);

});


app.post('/user', function (req, res) {
  request.post('http://user/user', req.body, function (err, response) {
    if (err) {
      console.error('Request /user failed', err);
      res.json(err, 500);
      return;
    }
    console.log("RESPONSE " , response);
    jsonResponse = JSON.parse(response.text); // TODO is python not returning json ?
    res.json(jsonResponse);
  });
});

app.get('/ping', function (req, res) {
  res.json({ response: 'pong' });
});

app.listen(config.port);

logger.info("Rest API started on http://localhost:" + config.port);

module.exports.app = app;
