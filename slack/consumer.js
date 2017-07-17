var amqp = require('amqplib/callback_api');
var config = require('./config.json');

var redis = require('redis').createClient(config.redis.port, config.redis.host);

amqp.connect('amqp://'+config.rabbitmq.host, function(err, conn) {
  if (err) console.error("Unable to connect to rabbitmq " + config.rabbitmq.host);

  conn.createChannel(function(err, ch) {
    if (err) console.error("Unable to create channel on rabbitmq " + config.rabbitmq.host);

    ch.assertQueue(config.rabbitmq.queue, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", config.rabbitmq.queue);

    ch.consume(config.rabbitmq.queue, function(msg) {
        //var secs = msg.content.toString().split('.').length - 1;
        var message = msg.content.toString();
        console.log(" [<-] %s", message);

        sendSlackNotification();

        setTimeout(function() {
          console.log(" [x] "+message);
          
          // Debug: Autoreply meesage
          //var reply = (new Date()).getTime()+ " Replying "+  message.substring(0,10);
          //ch.sendToQueue(config.rabbitmq.queue, new Buffer(reply), {persistent: true});
          //console.log(" [->] %s", reply);

          ch.ack(msg);
        }, 1 * 1000);
      }, {noAck: false});
    });
  });


  function sendSlackNotification(){
      //TODO Send slack
      var msg = "sent "+ (new Date()).getTime();
      console.log("Writting redis: " +msg);
      redis.lpush('messages', msg);
  }
