var config = require('./config.json');

var logFactory = require('./log.js');
var logger = logFactory.create("rest");

var redis = require('redis').createClient(config.redis.port, config.redis.host);

module.exports = {

  routes: function(app){

    app.get('/ping', function(req, res){
        res.json({response: 'pong'});
    });

    /** 
     * List all messages sent to a channel 
     * @param channel
     * @param limit (optional, default 10) 
     * @param offset (optional, default 0)
     * @return list of messages on that channel, first result will be the last user inserted
     */
    app.get('/messages', function(req, res){
        var params = req.query;
        logger.debug("GET /messages: " + JSON.stringify(params) );
        var limit = params.limit ||  10;
        var offset = params.offset || 0;
        redis.lrange(params.channel, offset, limit, function(err, results){
            if (err) logger.error("Unable to get messages " + err);
            res.json(results);
        });
    });

    /**
     * Send notification to slack via REST
     * @param message, channel 
     * @return 200 if successful
     */
    app.post('/', function(req, res){
        var json = req.body;
        logger.debug("POST / " + JSON.stringify(json) );

        if (!json.message || !json.channel) {
            res.json({error: "Invalid request, field message and channel required"}, 400)
        } else {
            //Save user to redis 
            //TODO send notification via slackinfo
            logger.info("Sending message to slack ("+ json.channel + "): " + json.message);
            //redis.hset(config.redisKey, json.channel, json.message, redis.print);
            redis.lpush(json.channel, json.message, function(err, r){
                if (err) logger.error("Unable to save redis message " + err) ; 
                res.json(json);
            });
        }

    });
  }
}